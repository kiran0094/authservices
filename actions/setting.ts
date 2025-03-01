"use server";
import * as z from "zod";
import { SettingsSchema } from "@/schema";
import { currentUser } from "@/lib/authserver";
import { prisma } from "@/lib/db";
import { getUsersById } from "@/data/user";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "unauthorized user" };
  }

  const DBuser = await getUsersById(user.id);

  if (!DBuser) {
    return { error: "unauthorized user DBuser" };
  }

  await prisma.user.update({
    where: {
      id: DBuser.id,
    },
    data: {
      ...values,
    },
  });
  return { success: "settings updated" };
};
