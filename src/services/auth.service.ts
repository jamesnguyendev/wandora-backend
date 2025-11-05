import bcrypt from "bcrypt";
import { prisma } from "../libs/db/prismaClient";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const registerUser = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "guest",
    },
  });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "30m" },
  );

  const userData = {
    id: user.id,
    email: user.email,
    role: user.role,
    verified: user.verified,
  };

  return { token, userData };
};

export const refreshTokenService = async (token: string) => {
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!, {
    ignoreExpiration: true,
  });

  const newToken = jwt.sign(
    { userId: decoded.userId, role: decoded.role },
    process.env.JWT_SECRET!,
    { expiresIn: "30m" },
  );

  return newToken;
};
