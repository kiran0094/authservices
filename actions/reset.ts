"use server"
import * as z from "zod"
import { ResetSchema } from "@/schema"
import{ getUsersByEmail} from "@/data/user"
import { generateResetPasswordToken } from "@/lib/token"
import { sendPasswordResetEmail } from "@/lib/mail"
export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const ValidatedFeilds = ResetSchema.safeParse(values)
    if (!ValidatedFeilds.success) {
        return{error:"invalid email!"}
    }
    const{email}=ValidatedFeilds.data

    const ExistingUser=await getUsersByEmail(email)

    if(!ExistingUser){
        return({error:"email not found "})
    }

    const passwordResetToken=await generateResetPasswordToken(ExistingUser.email as string)

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return({ success:"reset email sent"})

}