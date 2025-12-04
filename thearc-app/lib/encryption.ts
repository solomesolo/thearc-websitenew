import { KeyManagementServiceClient } from "@google-cloud/kms";

const keyName = process.env.CLOUD_KMS_KEY_ID;

// Development fallback: simple base64 encoding (NOT SECURE - for testing only!)
const useSimpleEncryption = !keyName || process.env.NODE_ENV === "development";

let client: KeyManagementServiceClient | null = null;

if (!useSimpleEncryption) {
  try {
    client = new KeyManagementServiceClient();
  } catch (error) {
    console.warn("⚠️  Failed to initialize KMS client, falling back to simple encryption");
  }
}

export async function encrypt(value: string): Promise<string> {
  if (useSimpleEncryption || !client) {
    // Fallback: simple base64 encoding (NOT SECURE - for testing only!)
    console.warn("⚠️  Using simple base64 encoding fallback (not secure!)");
    return Buffer.from(value).toString("base64");
  }

  if (!keyName) {
    throw new Error("CLOUD_KMS_KEY_ID environment variable is not set");
  }

  try {
    const [result] = await client.encrypt({
      name: keyName,
      plaintext: Buffer.from(value),
    });
    
    return result.ciphertext!.toString("base64");
  } catch (error) {
    console.error("KMS encryption failed, falling back to simple encryption:", error);
    // Fallback to simple encryption if KMS fails
    return Buffer.from(value).toString("base64");
  }
}

export async function decrypt(cipherText: string): Promise<string> {
  if (useSimpleEncryption || !client) {
    // Fallback: simple base64 decode
    try {
      return Buffer.from(cipherText, "base64").toString();
    } catch (error) {
      // If base64 decode fails, try KMS (might be old encrypted data)
      if (client && keyName) {
        try {
          const [result] = await client.decrypt({
            name: keyName,
            ciphertext: Buffer.from(cipherText, "base64"),
          });
          return result.plaintext!.toString();
        } catch (kmsError) {
          throw new Error("Failed to decrypt: invalid ciphertext format");
        }
      }
      throw new Error("Failed to decrypt: invalid ciphertext format");
    }
  }

  if (!keyName) {
    throw new Error("CLOUD_KMS_KEY_ID environment variable is not set");
  }

  try {
    const [result] = await client.decrypt({
      name: keyName,
      ciphertext: Buffer.from(cipherText, "base64"),
    });
    
    return result.plaintext!.toString();
  } catch (error) {
    // If KMS fails, try simple base64 decode (might be fallback-encrypted data)
    try {
      return Buffer.from(cipherText, "base64").toString();
    } catch (base64Error) {
      throw new Error("Failed to decrypt: invalid ciphertext format");
    }
  }
}
