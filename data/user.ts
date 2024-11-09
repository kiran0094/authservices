"use server"
import { prisma } from "@/lib/db";

export const getUsersByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error) {
          return null
        
    }

}

export const getUsersById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    } catch (error) {
        return null
        
    }

}