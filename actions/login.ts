"use server"
import { AuthError } from "next-auth";
import * as z from "zod"
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export const login=async(values:z.infer<typeof LoginSchema>)=>{
 const vaildatedFeilds=LoginSchema.parse(values);
 if(!vaildatedFeilds){
  return {error:"invalid data"}
 }
  const{email,password}=vaildatedFeilds;
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