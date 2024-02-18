import { USERS_SERVICE_URL } from "@/config"
import { User } from "@/interfaces/user"

export const getUser = async (id: string, token: string): Promise<User | null> => {
  try {
    console.log('getUser', id, token)
    const res = await fetch(`${USERS_SERVICE_URL}/users/${id}`, {
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