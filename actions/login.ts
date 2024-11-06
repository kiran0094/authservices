"use server"
import { AuthError } from "next-auth";
import * as z from "zod"
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import{getUsersByEmail} from "@/data/user"
import { generateVerificationToken } from "@/lib/token";
export const login=async(values:z.infer<typeof LoginSchema>)=>{
 const vaildatedFeilds=LoginSchema.parse(values);
 if(!vaildatedFeilds){
  return {error:"invalid data"}
 }
 const{email,password}=vaildatedFeilds;
 const existingUser=await getUsersByEmail(email)
if(!existingUser || !existingUser.password  ||!existingUser.email){
    return {error:"email does not exist"}
}
if(!existingUser.emailVerified){
  const VerificationToken=await generateVerificationToken(existingUser.email)
  return{success:"confirm email sent!"}
}
  
  try {
    await signIn("credentials",
         { email,
         password,
        redirectTo:DEFAULT_LOGIN_REDIRECT});
  } catch (error) {
    if(error instanceof AuthError){
        switch (error.type) {
            case "CredentialsSignin":
                return {error:"invalid email or password"}                
                break;
        
            default:
                return {error:"something went wrong"}
                break;
        }
    }
    throw error;
  }
}