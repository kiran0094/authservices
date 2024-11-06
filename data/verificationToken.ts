import { prisma } from "@/lib/db";


export const getVerificationTokenBytoken=async(
    token:string
)=>{
    try {
        const verificationToken=await prisma.verificationToken.findUnique({
            where:{token}
        })
        return verificationToken
        
    } catch (error) {
        return null
    }
}

export const getVerificationTokenByEmail=async(
    email:string
)=>{
    try {
        const verificationToken=await prisma.verificationToken.findFirst({
            where:{email}
        })
        return verificationToken
        
    } catch (error) {
        return null
    }
}
