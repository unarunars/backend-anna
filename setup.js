
require('dotenv').config();

const fs = require('fs');
const util = require('util');

const { query } = require('./db');

const readFileAsync = util.promisify(fs.readFile);

const {
  DATABASE_URL: databaseUrl,
} = process.env;

async function main() {
  console.info(`Set upp gagnagrunn á ${databaseUrl}`);


  // henda töflum
try {
    const createTable = await readFileAsync('./sql/drop.sql');
    await query(createTable.toString('utf8'));
    console.info('Töflum hent');
  } catch (e) {
    console.error('Villa við að henda töflum:', e.message);
    return;
  }

  // búa til töflur út frá skema
  try {
    const createTable = await readFileAsync('./sql/schema.sql');
    await query(createTable.toString('utf8'));
    console.info('Tafla búin til');
  } catch (e) {
    console.error('Villa við að búa til töflu:', e.message);
    return;
  }
  try {
    const createUsers = await readFileAsync('./sql/temp.sql');
    await query(createUsers.toString('utf8'));
    console.info('Notandi búin til');
  } catch (e) {
    console.error('Villa við að búa til notanda:', e.message);
    return;
  }
} 


main().catch((err) => {
  console.error(err);
});
