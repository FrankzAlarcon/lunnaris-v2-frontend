export interface User {
  email: string
  firstName: string
  lastName: string
  fullName: string
  id: string
  phone: string
  seeLater: string[]
  userType: {
    id: number
    value: string
  }
  username: string
  watched: any[]
  token: string
}

export interface Participant {
  id: string
  fullName: string
}

export interface ChatUser {
  id: string
  messages: Message[]
  participants: Participant[]
}

export interface Message {
  id: string
  content: string
  recipient: Participant
  sender: Participant
  timestamp: number
}

export interface SendMessage {
  content: string
  recipient: string
  sender: string
  timestamp: number
}