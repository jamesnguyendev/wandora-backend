import { PrismaClient } from "./src/generated/prisma";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

export const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.user.deleteMany({});
});
