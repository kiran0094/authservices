import { prisma } from "@/lib/db";
export const getTwoFactorConformationByUserId=async(userId:string)=>{

    try {
        const twoFactorConformation=await prisma.twoFactorconfirmation.findUnique({
            where:{userId}
        })
        return twoFactorConformation
    } catch (error) {
        return null
    }
}