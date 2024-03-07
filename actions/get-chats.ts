import { User } from "@/interfaces/user";
import { getCurrentUser } from "./getCurrentUser";
import { USERS_SERVICE_URL } from "@/config";

export const getUsers = async (): Promise<User[] | null> => {
  try {
    console.log('chat - getUsers',)
    const user = await getCurrentUser()

    if (!user) return null

    const res = await fetch(`${USERS_SERVICE_URL}/users/`, {
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
    console.log(json.body)
    return json.body
  } catch (error) {
    console.log(error)
    return null
  }
}
