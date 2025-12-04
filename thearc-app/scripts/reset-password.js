require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const argon2 = require('argon2');

// Simple base64 decrypt function (matching encryption.ts fallback)
function decryptBase64(cipherText) {
  try {
    return Buffer.from(cipherText, 'base64').toString();
  } catch (error) {
    throw new Error('Failed to decrypt: invalid ciphertext format');
  }
}

const databaseUrl = process.env.DATABASE_URL || '';
const url = new URL(databaseUrl.replace(/^postgresql:/, 'postgres:'));
const password = decodeURIComponent(url.password);

const pool = new Pool({
  host: url.hostname,
  port: parseInt(url.port) || 5432,
  database: url.pathname.slice(1),
  user: url.username,
  password: password,
  ssl: false,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function resetPassword() {
  try {
    const email = 'annasolohere@gmail.com';
    const newPassword = 'test123456'; // Set a known password
    
    console.log('Looking for user:', email);
    const users = await prisma.user.findMany();
    
    for (const user of users) {
      const decryptedEmail = decryptBase64(user.emailEncrypted);
      if (decryptedEmail.toLowerCase() === email.toLowerCase()) {
        console.log(`✅ Found user: ${decryptedEmail}`);
        
        // Hash the new password
        const newHash = await argon2.hash(newPassword);
        
        // Update the password
        await prisma.user.update({
          where: { id: user.id },
          data: { passwordHash: newHash },
        });
        
        console.log(`✅ Password reset for ${decryptedEmail}`);
        console.log(`New password: ${newPassword}`);
        await prisma.$disconnect();
        process.exit(0);
      }
    }
    
    console.log('❌ User not found');
    await prisma.$disconnect();
    process.exit(1);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

resetPassword();

