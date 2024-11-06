import { getVerificationTokenByEmail } from "@/data/verificationToken"
import {v4 as uuidv4} from "uuid"
import { prisma } from "./db"
export const generateVerificationToken=async(email:string)=>{
    const token=uuidv4()
    const expires=new Date(new Date().getTime()+60*60*1000)
    const ExistingToken=await getVerificationTokenByEmail(email)
    if(ExistingToken){
        await prisma.verificationToken.delete({
            where:{
                id:ExistingToken.id
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
        
