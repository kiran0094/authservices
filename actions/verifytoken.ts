"use server"
import {prisma} from "@/lib/db";
import{getUsersByEmail} from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { error } from "console";
export const verifyToken = async (token: string) => {
    try {
        const exisingToken = await getVerificationTokenByToken(token);
        console.log("token",exisingToken)
        if (!exisingToken){
            return {error:"token does not exist"};
        };
        interface VerificationToken {
            token: string;
            email: string;
            expires: Date;
        }
        const hasExpired = new Date((exisingToken as VerificationToken).expires) < new Date();
        if (hasExpired) {
            return {error: "token has expired" };
        }
        console.log((exisingToken as VerificationToken).email)
        const   existinguser = await getUsersByEmail((exisingToken as VerificationToken).email);

        if (!existinguser){
                return {error: "email does not exist" };
        }
        await prisma.user.update({
            where: {
                id: existinguser.id
            },
            data: {
                emailVerified: new Date(),
                email: (exisingToken as VerificationToken).email
            }
        });
        await prisma.verificationToken.delete({
            where: {
                token
            }
        });
        return {success:"email verified"} ;
    } catch (error) {
        return {error:"something went wrong"};
    }
    
}