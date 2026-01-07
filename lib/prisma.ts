import { PrismaClient } from '@/generated/prisma'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Parse DATABASE_URL connection string
const connectionUrl = new URL(process.env.DATABASE_URL!)
const adapter = new PrismaMariaDb({
  host: connectionUrl.hostname,
  port: parseInt(connectionUrl.port || '3306'),
  user: connectionUrl.username,
  password: connectionUrl.password,
  database: connectionUrl.pathname.slice(1), // Remove leading slash
})

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 