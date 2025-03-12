import { newPassword } from "@/actions/new-password";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnable: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "new password is required",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "password is required",
      path: ["password"],
    },
  );

export const LoginSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: z.string().min(6),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "email is required for reset password" }),
});
export const New_password = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
