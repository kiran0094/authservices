"use server"
import * as z from "zod"
import { New_password } from "@/schema"
import { getResetPasswordTokenByToken } from './../lib/resetpassword';
import { getUsersByEmail } from "@/data/user";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs"


export const newPassword=async(
    values:z.infer<typeof New_password>,
    token:string|undefined
)=>{

    if(!token){
        return{error:"Missing Token!"}
    }

    const validateFeilds=New_password.safeParse(values)
    if(!validateFeilds.success){
        return{error:"Invalid Data!"}
    }
    const {password}=validateFeilds.data;
    const existingToken=await getResetPasswordTokenByToken(token)
    if(!existingToken){
        return{error:"Invalid Token!"}
    }
    const hasExpired=new Date(existingToken.expires)<new Date();
    if(hasExpired){
        return{error:"Token expired"}
    }
    const existingUser=await getUsersByEmail(existingToken.email);
    if(!existingUser){
        return{error:"User does not exist!"}
    }
   const hashedPassword=await bcrypt.hash(password,10);

    await prisma.user.update({
        where:{id:existingUser.id},
        data:{password:hashedPassword}
    })
    await prisma.resetPasswordToken.delete({
        where:{id:existingToken.id}
    })
    return{success:"password reset successfully"}
    
}