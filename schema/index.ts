import { z } from "zod"

 export const LoginSchema = z.object({
    email: z.string().email({message: "email is required"}),
    password: z.string().min(6),
  
})


export const ResetSchema = z.object({
    email: z.string().email({message: "email is required for reset password"}),
 
})
export const New_password = z.object({
    password: z.string().min(6,{message: "Password must be atleast 6 characters"}),
 
})



export const RegisterSchema = z.object({
    name: z.string().min(1,{ message:"Username is required"}),
    email: z.string().email({message: "Email is required"}),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
  
})