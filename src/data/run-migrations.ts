import { config } from 'dotenv'
config()
import { Client } from 'pg'
import * as fs from 'fs'
import * as path from 'path'

async function runMigrations() {
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: parseInt(process.env.PGPORT || '5432'),
  })

  try {
    await client.connect()

    const migrationsDir = path.join(__dirname, './tables')
    const migrationFiles = fs.readdirSync(migrationsDir)

    for (const migrationFile of migrationFiles) {
      const migrationPath = path.join(migrationsDir, migrationFile)
      const migrationQuery = fs.readFileSync(migrationPath, 'utf8')

      await client.query(migrationQuery)
      console.log(`Migração ${migrationFile} concluída.`)
    }

    console.log('Todas as migrações foram concluídas com sucesso!')
  } catch (error) {
    console.error('Erro durante as migrações:', error)
  } finally {
    await client.end()
  }
}

runMigrations()
