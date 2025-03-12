"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { SettingsSchema } from "@/schema";
import { currentUser } from "@/lib/authserver";
import { prisma } from "@/lib/db";
import { getUsersByEmail, getUsersById } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "unauthorized user" };
  }

  const DBuser = await getUsersById(user.id);

  if (!DBuser) {
    return { error: "unauthorized user DBuser" };
  }

  if (user.isOauth) {
    values.email = undefined;
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUsersByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "email already in use !" };
    }
    const VerificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      VerificationToken.email,
      VerificationToken.token,
    );
    return { success: "verification email sent!" };
  }

  if (values.password && values.newPassword && DBuser.password) {
    console.log("enter check password");
    const Macthpassword = await bcrypt.compare(
      values.password,
      DBuser.password,
    );
    if (!Macthpassword) {
      return { error: "incorrect password" };
    }
    const hashPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashPassword;
    values.newPassword = undefined;
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
