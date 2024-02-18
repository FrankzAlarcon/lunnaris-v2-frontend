import { User } from "@/interfaces/user";
import { getCurrentUser } from "./getCurrentUser";
import { USERS_SERVICE_URL } from "@/config";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const getUsers = async (): Promise<User[] | null> => {
  try {
    const user = await getCurrentUser()

    if (!user) return null

    const res = await fetch(`${USERS_SERVICE_URL}/user/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    if (!res.ok) {
      console.log(await res.text())
      return null
    }

    const json = await res.json()

    return json.body
  } catch (error) {
    console.log(error)
    return null
  }
}
