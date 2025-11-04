import { prisma } from "../libs/db/prismaClient";

interface User {
  email: string;
  passwordHash: string;
  role: string;
  verified: boolean;
}

export const getUsers = async (): Promise<Omit<User, "passwordHash">[]> => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      email: true,
      role: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return users;
};

export const updateUser = async (id: string, data: Partial<User>) => {
  return await prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string): Promise<User | null> => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
};
