import { AuthContext, AuthContextProps } from "@/context/auth-context-provider"
import { useContext } from "react"

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextProps
}