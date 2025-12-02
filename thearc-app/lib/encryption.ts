import { KeyManagementServiceClient } from "@google-cloud/kms";

const client = new KeyManagementServiceClient();

const keyName = process.env.CLOUD_KMS_KEY_ID!;

export async function encrypt(value: string): Promise<string> {
  if (!keyName) {
    throw new Error("CLOUD_KMS_KEY_ID environment variable is not set");
  }

  const [result] = await client.encrypt({
    name: keyName,
    plaintext: Buffer.from(value),
  });
  
  return result.ciphertext!.toString("base64");
}

export async function decrypt(cipherText: string): Promise<string> {
  if (!keyName) {
    throw new Error("CLOUD_KMS_KEY_ID environment variable is not set");
  }

  const [result] = await client.decrypt({
    name: keyName,
    ciphertext: Buffer.from(cipherText, "base64"),
  });
  
  return result.plaintext!.toString();
}

