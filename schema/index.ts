import { z } from "zod"

 export const LoginSchema = z.object({
    email: z.string().email({message: "email is required"}),
    password: z.string().min(6),
  
})

export const RegisterSchema = z.object({
    name: z.string().min(1,{ message:"Username is required"}),
    email: z.string().email({message: "Email is required"}),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  
})