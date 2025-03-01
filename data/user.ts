"use server";
import { prisma } from "@/lib/db";

export const getUsersByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUsersById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      console.log(`User with ID ${id} not found.`);
    }
    return user;
  } catch (error) {
    return null;
  }
};
