import { verifyToken } from './../actions/verifytoken';
import { prisma } from "./db";

export const getResetPasswordTokenByToken=async(token:string)=>{
    try {
        const passwordToken=await prisma.resetPasswordToken.findUnique({
            where:{
                token
            }
        })
        return passwordToken
        
    } catch (error) {
        return null
    }

}

export const getResetPasswordTokenByEmail=async(email:string)=>{
    try {
        const passwordToken=await prisma.resetPasswordToken.findFirst({
            where:{
                email
            }
        })
        return passwordToken
        
    } catch (error) {
        return null
    }

}