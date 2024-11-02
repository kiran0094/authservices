import { getUsersById } from './data/user';
import{JWT}from "next-auth/jwt";
import NextAuth,{type DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "./lib/db"
import {UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

declare module "next-auth/jwt" {
    
    interface JWT { 
        role?:UserRole
    }
}
    

 
export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "auth/login",
        error: "auth/error",
    },
    events: {
        async linkAccount({user}){
            await prisma.user.update({
                where:{
                    id:user.id
                },
                data:{
                    emailVerified:new Date()
                }
            })
        }
    },
    callbacks: {
        // async signIn({ user }) {
        //     if(!user) return false
        //     const existingUser = await getUsersById(user.email)
        //     if(!existingUser) return false
        //     return true
            
        // },
       
        async session({ token, session }) {
            if(token.sub && session.user){
                session.user.id = token.sub
            }

            if(token.role && session.user){
                session.user.role = token.role
            }
            console.log({
                sessionToken:token,
            });
            
            return session
            
        },
        async jwt({ token }) {
            if(!token.sub) return token
            const existingUser = await getUsersById(token.sub)
            if(!existingUser) return token

            token.role=existingUser.role
            return token
        }
        
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig
})