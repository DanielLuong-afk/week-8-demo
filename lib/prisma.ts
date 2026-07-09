import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "./generated/prisma/client";
 
const connectionString = `${process.env.DATABASE_URL}`;
 
const prismaClientSingleton = () => {
  // Pass the raw connection string string directly, and provide an options object as required
  const adapter = new PrismaNeonHttp(connectionString, {
    // If your driver requires specific flag mappings (like arrayMode), they go here.
    // For a standard setup, an empty or default object is typically sufficient:
  });
 
  return new PrismaClient({ adapter });
};
 
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}
 
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
 
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}