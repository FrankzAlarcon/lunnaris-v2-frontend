"use client"
import { User } from "@/interfaces/user"
import { SessionProvider, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

export interface AuthContextProps {
  user: User | null
  addUser: (user: User) => void
  addMedia: (mediaId: string) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

const AuthContextProvider = ({
  children
}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)
  const addUser = useCallback((user: User) => {
    console.log(user)
    setUser(user)
  }, [])

  const addMedia = useCallback(async (mediaId: string) => {
    if (!user) {
      return toast.error('Debes iniciar sesión')
    }
    const response = await fetch(`/api/user/see-later`, {
      method: 'POST',
      body: JSON.stringify({
        media: mediaId
      })
    })
    if (response.ok) {
      toast.success('Agregado a tu lista')
    }
    const data = await response.json()
    setUser({
      ...user,
      seeLater: [
        ...user.seeLater,
        data.id
      ]
    })
  }, [user])
  const values = useMemo(() => ({
    user,
    addUser,
    addMedia
  }), [user, addUser,addMedia])
  return (
    <SessionProvider>
      <AuthContext.Provider value={values}>
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  )
}

export default AuthContextProvider