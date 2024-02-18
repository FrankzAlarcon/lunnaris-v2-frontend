import { MEDIA_SERVICE_URL } from "@/config"
import { getCurrentUser } from "./getCurrentUser"
import { Genre } from "@/interfaces/media"

export const getGenres = async (): Promise<Genre[] | null> => {
  try {
    const user = await getCurrentUser()

    if (!user) return null
  
    const res = await fetch(`${MEDIA_SERVICE_URL}/media/enums/genres`, {
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
    return null
  }
}