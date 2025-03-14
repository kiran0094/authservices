"use server"
import crypto from "crypto"
import { getVerificationTokenByEmail } from "@/data/verificationToken"
import { getResetPasswordTokenByEmail } from "./resetpassword"
import { getTwoFactorTokenByEmail } from "@/data/twofactortoken";
import {v4 as uuidv4} from "uuid"
import { prisma } from "./db"

export const generateTwoFactorToken=async(email:string)=>{
    const token=crypto.randomInt(100_000,1000_000).toString()
    const expires=new Date(new Date().getTime()+60*15*1000)
    const ExistingToken=await getTwoFactorTokenByEmail (email)
    if(ExistingToken){
        await prisma.twoFactorToken.delete({
            where:{
                token:ExistingToken.token
            },
        })
    }
    const verificationToken=await prisma.twoFactorToken.create({
        data:{
            email,
            token,
            expires,
        }
    })
    return verificationToken

    
}


export const generateResetPasswordToken=async(email:string)=>{
    const token=uuidv4()
    const expires=new Date(new Date().getTime()+60*60*1000)
    const ExistingToken=await getResetPasswordTokenByEmail(email)
    if(ExistingToken){
        await prisma.resetPasswordToken.delete({
            where:{
                token:ExistingToken.token
            },
        })
    }
    const verificationToken=await prisma.resetPasswordToken.create({
        data:{
            email,
            token,
            expires,
        }
    })
    return verificationToken
}

export const generateVerificationToken=async(email:string)=>{
    const token=uuidv4()
    const expires=new Date(new Date().getTime()+60*60*1000)
    const ExistingToken=await getVerificationTokenByEmail(email)
    if(ExistingToken){
        await prisma.verificationToken.delete({
            where:{
                token:ExistingToken.token
            },
        })
    }
    const verificationToken=await prisma.verificationToken.create({
        data:{
            email,
            token,
            expires,
        }
    })
    return verificationToken
}
        
