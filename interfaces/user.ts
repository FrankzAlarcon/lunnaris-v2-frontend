export interface User {
  email: string
  firstName: string
  lastName: string
  fullName: string
  id: string
  phone: string
  seeLater: any[]
  userType: {
    id: number
    value: string
  }
  username: string
  watched: any[]
  token: string
}

export interface User2 {
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
  from: User2
}
export interface ChatUser {
  id: string
  user: User2
  messages: Message[]
}