import { PrismaClient } from '@prisma/client'

// To prevent new PrismaClient() to run on every hot reload from nextjs
// If it is the first run we set db to a new PrismaClient, while on every hot reload
// if not in production we export the stored db on globalThis.prisma
declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db