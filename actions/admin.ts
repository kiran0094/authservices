"use server";
import { UserRole } from "@prisma/client";
import { currentUserRole } from "@/lib/authserver";
import { error } from "console";

export const isAdmin = async () => {
  const role = await currentUserRole();
  if (role === UserRole.ADMIN) {
    return { error: "You are  allowed to access this page" };
  }
  return { success: "You are not allowed to access this page" };
};
