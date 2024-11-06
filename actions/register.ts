"use server"
import{prisma} from "@/lib/db"
import bcrypt from "bcryptjs"
import * as z from "zod"
import { RegisterSchema } from "@/schema";
import{getUsersByEmail} from "@/data/user"
import { generateVerificationToken } from "@/lib/token";
export const register=async(values:z.infer<typeof RegisterSchema>)=>{
 const vaildatedFeilds=RegisterSchema.parse(values);
 console.log(vaildatedFeilds)
 if(!vaildatedFeilds){
  return {error:"invalid data"}
}
const{email,name,password}=vaildatedFeilds
const hashPassword=await bcrypt.hash(password,10)

const existingUser=await getUsersByEmail(email)
if(existingUser){
    return {error:"user email already exists"}
}
await prisma.user.create({
    data:{
        email,
        name,
        password:hashPassword
    }
})
const verificationToken=await generateVerificationToken(email);
 return {success:"comfirm  email sent"}
}