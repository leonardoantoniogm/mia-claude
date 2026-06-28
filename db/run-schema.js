const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

const connectionString = process.argv[2]
if (!connectionString) {
  console.error('Usage: node db/run-schema.js <DATABASE_URL>')
  process.exit(1)
}

const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')

const client = new Client({ connectionString })

client
  .connect()
  .then(() => client.query(sql))
  .then(() => client.query('SELECT version()'))
  .then((res) => {
    console.log('Schema applied. Server:', res.rows[0].version)
    return client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    )
  })
  .then((res) => {
    console.log('Tables:', res.rows.map((r) => r.table_name).join(', '))
  })
  .catch((err) => {
    console.error('Error applying schema:', err.message)
    process.exitCode = 1
  })
  .finally(() => client.end())
