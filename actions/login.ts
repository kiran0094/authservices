"use server";
import { AuthError } from "next-auth";
import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUsersByEmail } from "@/data/user";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token";
import { getTwoFactorConformationByUserId } from "@/data/twofactorconformation";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/twofactortoken";
import { prisma } from "@/lib/db";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFeilds = LoginSchema.parse(values);
  if (!validatedFeilds) {
    return { error: "invalid data" };
  }
  const { email, password, code } = validatedFeilds;
  const existingUser = await getUsersByEmail(email);
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "email does not exist" };
  }
  if (!existingUser.emailVerified) {
    const VerificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendVerificationEmail(
      VerificationToken.email,
      VerificationToken.token,
    );
    return { success: "confirm email sent!" };
  }

  if (existingUser.isTwoFactorEnable && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invaild code!" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "code expired!" };
      }
      const twoFactorConformation = await getTwoFactorConformationByUserId(
        existingUser.id,
      );

      if (twoFactorConformation) {
        await prisma.twoFactorconfirmation.delete({
          where: {
            id: twoFactorConformation.id,
          },
        });
      }

      await prisma.twoFactorconfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const TwoFactorToken = await generateTwoFactorToken(existingUser.email);
      console.log("TwoFactorToken", TwoFactorToken);
      await sendTwoFactorEmail(TwoFactorToken.email, TwoFactorToken.token);

      return { twofactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid email or password" };
          break;

        default:
          return { error: `something went wrong` };
          break;
      }
    }
    throw error;
  }
};
