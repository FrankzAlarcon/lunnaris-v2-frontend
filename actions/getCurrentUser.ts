import { getServerSession } from "next-auth"
import { getUser } from "./get-user"
import { User } from "@/interfaces/user"
import { authOptions } from "@/lib/auth-options"

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getSession()
    if (!session?.user || !session?.jwt) return null
    const currentUser = await getUser(session?.user.id, session?.jwt)
    
    if (!currentUser) {
      return null
    } 
    
    return {
      ...currentUser,
      token: session.jwt
    }
  } catch (error) {
    return null
  }
}