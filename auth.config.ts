import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schema"
import { getUsersByEmail } from "./data/user"
import bcrypt from "bcryptjs"
import github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import google from "next-auth/providers/google"

 
export default { 
    providers: [
        github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const vaildatedFeilds=LoginSchema.safeParse(credentials);
                if(vaildatedFeilds.success){
                    const {email,password}=vaildatedFeilds.data

                    const user = await getUsersByEmail(email)
                    if(!user||!user.password){
                        return null
                    }
                    const Macthpassword=await bcrypt.compare(password,user.password)
                    if(Macthpassword){
                        return user
                    }
                    
                     }
                return null
            }


        }),
    ]

} satisfies NextAuthConfig