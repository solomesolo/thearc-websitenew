import * as crypto from "crypto";

// Encryption key from environment variable
// Must be a 32-byte key in hex format (64 characters)
const encryptionKey = process.env.ENCRYPTION_KEY;

// Validate and get the encryption key
function getKey(): Buffer {
  if (!encryptionKey) {
    throw new Error(
      "ENCRYPTION_KEY environment variable is not set. Must be a 32-byte key in hex format (64 characters)."
    );
  }

  // Validate key length (64 hex characters = 32 bytes)
  if (encryptionKey.length !== 64) {
    throw new Error(
      `ENCRYPTION_KEY must be exactly 64 hex characters (32 bytes). Current length: ${encryptionKey.length}. Generate with: openssl rand -hex 32`
    );
  }

  try {
    const key = Buffer.from(encryptionKey, "hex");
    
    // Double-check it's exactly 32 bytes
    if (key.length !== 32) {
      throw new Error(
        `ENCRYPTION_KEY must decode to exactly 32 bytes. Decoded length: ${key.length}. Generate with: openssl rand -hex 32`
      );
    }
    
    return key;
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENCRYPTION_KEY")) {
      throw error;
    }
    throw new Error(
      `ENCRYPTION_KEY must be a valid hex string. Generate with: openssl rand -hex 32. Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Encrypts a JSON-serializable payload using AES-256-GCM
 * @param payload - Any JSON-serializable value (object, array, string, number, etc.)
 * @returns Base64-encoded string containing IV, auth tag, and ciphertext
 * @throws Error if ENCRYPTION_KEY is not set or invalid
 */
export function encryptJson(payload: unknown): string {
  const key = getKey();
  
  // Serialize payload to JSON
  const plaintext = JSON.stringify(payload);
  
  // Generate a random 12-byte IV (96 bits) for GCM
  const iv = crypto.randomBytes(12);
  
  // Create cipher with AES-256-GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  
  // Encrypt the plaintext
  let ciphertext = cipher.update(plaintext, "utf8");
  ciphertext = Buffer.concat([ciphertext, cipher.final()]);
  
  // Get the authentication tag (16 bytes for GCM)
  const authTag = cipher.getAuthTag();
  
  // Combine IV (12 bytes) + authTag (16 bytes) + ciphertext
  // Format: IV | AuthTag | Ciphertext
  const combined = Buffer.concat([iv, authTag, ciphertext]);
  
  // Return as base64 string
  return combined.toString("base64");
}

/**
 * Decrypts a base64-encoded ciphertext and returns the original JSON payload
 * @param ciphertextB64 - Base64-encoded string containing IV, auth tag, and ciphertext
 * @returns The decrypted and parsed JSON value
 * @throws Error if decryption fails, key is invalid, or data is corrupted
 */
export function decryptJson<T = any>(ciphertextB64: string): T {
  const key = getKey();
  
  try {
    // Decode from base64
    const combined = Buffer.from(ciphertextB64, "base64");
    
    // Extract components
    // IV: first 12 bytes
    // AuthTag: next 16 bytes
    // Ciphertext: remaining bytes
    if (combined.length < 28) {
      throw new Error(
        "Invalid ciphertext format: too short. Expected at least 28 bytes (12 IV + 16 auth tag)."
      );
    }
    
    const iv = combined.subarray(0, 12);
    const authTag = combined.subarray(12, 28);
    const ciphertext = combined.subarray(28);
    
    // Create decipher with AES-256-GCM
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    
    // Set the authentication tag
    decipher.setAuthTag(authTag);
    
    // Decrypt
    let plaintext = decipher.update(ciphertext);
    plaintext = Buffer.concat([plaintext, decipher.final()]);
    
    // Parse JSON and return
    return JSON.parse(plaintext.toString("utf8")) as T;
  } catch (error) {
    if (error instanceof Error) {
      // Provide more context for common errors
      if (error.message.includes("Unsupported state")) {
        throw new Error(
          "Decryption failed: authentication tag verification failed. The data may be corrupted or the key is incorrect."
        );
      }
      if (error.message.includes("Invalid character")) {
        throw new Error(
          "Decryption failed: invalid base64 format. The ciphertext may be corrupted."
        );
      }
      if (error.message.includes("Unexpected token") || error.message.includes("JSON")) {
        throw new Error(
          "Decryption succeeded but JSON parsing failed. The data may be corrupted."
        );
      }
      throw new Error(`Decryption failed: ${error.message}`);
    }
    throw new Error(`Decryption failed: ${String(error)}`);
  }
}

/**
 * Legacy function for backward compatibility
 * Encrypts a string value (wraps it in JSON first)
 * @deprecated Use encryptJson instead
 */
export async function encrypt(value: string): Promise<string> {
  return encryptJson(value);
}

/**
 * Legacy function for backward compatibility
 * Decrypts a ciphertext and returns the original string
 * @deprecated Use decryptJson instead
 */
export async function decrypt(cipherText: string): Promise<string> {
  const result = decryptJson<string>(cipherText);
  return result;
}
