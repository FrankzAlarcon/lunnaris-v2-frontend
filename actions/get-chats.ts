import { ChatUser } from "@/interfaces/user";
import { getCurrentUser } from "./getCurrentUser";
import { BACKEND_URL } from "@/config";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const getUsers = async () => {
  try {
    const user = await getCurrentUser()

    if (!user) return null

    const res = await fetch(`${BACKEND_URL}/user`, {
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

export const getChatsUsers = async (): Promise<ChatUser[]> => {
  return [
    {
      id: generateId(),
      user: {
        id: generateId(),
        name: "Kendra Sunders",
        email: "kendra@gmail.com",
        image: "/imgs/chat1.png"
      },
      messages: [
        {
          id: generateId(),
          text: "Hey, how are you?",
          createdAt: "2021-08-01T12:00:00.000Z",
          from: {
            id: generateId(),
            name: "Kendra Sunders",
            email: "kendra@gmail.com",
            image: "/imgs/chat1.png"
          }
        }, {
          id: generateId(),
          text: "I'm fine, thanks",
          createdAt: "2021-08-01T12:00:00.000Z",
          from: {
            id: generateId(),
            name: "Joseph Wright",
            email: "josepth@gmail.com",
            image: "/imgs/user.png"
          }
        }
      ]
    }, {
      id: generateId(),
      user: {
        id: generateId(),
        name: "John Cooper",
        email: "john@gmail.com",
        image: "/imgs/chat2.png"
      },
      messages: [
        {
          id: generateId(),
          text: "Hey, how are you?",
          createdAt: "2021-08-01T12:00:00.000Z",
          from: {
            id: generateId(),
            name: "John Cooper",
            email: "john@gmail.com",
            image: "/imgs/chat2.png"
          }
        }, {
          id: generateId(),
          text: "I'm fine, thanks",
          createdAt: "2021-08-01T12:00:00.000Z",
          from: {
            id: generateId(),
            name: "Joseph Wright",
            email: "josepth@gmail.com",
            image: "/imgs/user.png"
          }
        }
      ]
    }
  ]
}