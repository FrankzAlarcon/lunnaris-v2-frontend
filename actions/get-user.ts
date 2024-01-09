import { BACKEND_URL } from "@/config"
import { User } from "@/interfaces/user"

export const getUser = async (id: string, token: string): Promise<User | null> => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res.ok) {
      console.log(await res.text())
      return null
    }
    const json = await res.json()
    return json.body
  } catch (error) {
    return null
  }
}