#!/usr/bin/env node
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { Client } = pg;

const PROJECT_REF = 'arqpibdwiwqjevkjmejo';
const PASSWORD = '2y#KLFxD27GQ2_L';

async function main() {
  const encodedPw = encodeURIComponent(PASSWORD);

  const client = new Client({
    connectionString: `postgresql://postgres:${encodedPw}@db.${PROJECT_REF}.supabase.co:5432/postgres`,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✓ Connected to Supabase PostgreSQL');

    // Run schema as a single batch (all DDL at once)
    const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    // Remove comment lines and execute as batch
    const cleanSchema = schema
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n');

    await client.query(cleanSchema);
    console.log('✓ Schema applied');

    // Seed data
    const { rows } = await client.query('SELECT count(*)::int as c FROM questions');
    if (rows[0].c > 0) {
      console.log(`✓ Database already has ${rows[0].c} questions — skipping seed`);
    } else {
      const seedPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
      const seed = fs.readFileSync(seedPath, 'utf-8');
      
      await client.query(seed);
      console.log('✓ 30 seed questions inserted');
    }

    await client.end();
    console.log('\n✅ Database ready! Now run: npm run dev');
  } catch (err) {
    console.error('Setup failed:', err.message);
    process.exit(1);
  }
}

main();
