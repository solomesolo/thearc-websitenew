require('dotenv').config();
const { Pool } = require('pg');

const url = new URL(process.env.DATABASE_URL.replace(/^postgresql:/, 'postgres:'));
const password = decodeURIComponent(url.password);

// Connect to postgres database to create thearc_prod
const pool = new Pool({
  host: url.hostname,
  port: parseInt(url.port) || 5432,
  database: 'postgres',
  user: url.username,
  password: password,
  ssl: false,
});

async function createDatabase() {
  try {
    console.log('Connecting to create database...');
    const client = await pool.connect();
    console.log('✅ Connected!');
    
    // Check if database exists
    const checkResult = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = 'thearc_prod'
    `);
    
    if (checkResult.rows.length > 0) {
      console.log('✅ Database thearc_prod already exists');
    } else {
      console.log('Creating database thearc_prod...');
      await client.query('CREATE DATABASE thearc_prod');
      console.log('✅ Database thearc_prod created successfully!');
    }
    
    client.release();
    await pool.end();
    
    // Test connection to new database
    console.log('\nTesting connection to thearc_prod...');
    const pool2 = new Pool({
      host: url.hostname,
      port: parseInt(url.port) || 5432,
      database: 'thearc_prod',
      user: url.username,
      password: password,
      ssl: false,
    });
    
    const client2 = await pool2.connect();
    const result = await client2.query('SELECT current_database(), current_user');
    console.log('✅ Successfully connected to thearc_prod!');
    console.log('  Database:', result.rows[0].current_database);
    console.log('  User:', result.rows[0].current_user);
    client2.release();
    await pool2.end();
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Code:', error.code);
    process.exit(1);
  }
}

createDatabase();
