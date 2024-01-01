export interface User {
  id: string
  name: string
  email: string
  image: string
}

interface Chat {
  id: string
  messages: Message[]
}

interface Message {
  id: string
  text: string
  createdAt: string
  from: User
}
export interface ChatUser {
  id: string
  user: User
  messages: Message[]
}