import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-unused-vars
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// export async function disconnect() {
//   await prisma.$disconnect();

//   return true;
// }

// export async function connect() {
//   await prisma.$connect();

//   return true;
// }

// reference: https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices