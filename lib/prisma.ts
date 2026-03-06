import { PrismaClient } from '@/generated/prisma'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

// Parse DATABASE_URL and use explicit pool/connect timeouts for remote MySQL hosts.
const connectionUrl = new URL(databaseUrl)
const adapter = new PrismaMariaDb({
  host: connectionUrl.hostname,
  port: parseInt(connectionUrl.port || '3306', 10),
  user: decodeURIComponent(connectionUrl.username),
  password: decodeURIComponent(connectionUrl.password),
  database: decodeURIComponent(connectionUrl.pathname.slice(1)),
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
  acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT_MS || '30000', 10),
  connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT_MS || '10000', 10),
  idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT_S || '1800', 10),
  keepAliveDelay: 0,
})

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 
