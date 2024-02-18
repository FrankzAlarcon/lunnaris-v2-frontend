'use client'

import { NEXT_PUBLIC_SOCKET_URL } from "@/config"
import { ChatUser, Message, User } from "@/interfaces/user"
import { useSession } from "next-auth/react"
import { ReactNode, createContext, useCallback, useMemo, useState } from "react"
import { io } from 'socket.io-client'


interface CurrentUserMetadata {
  id: string
  fullName: string
}
export interface ChatContextProps {
  users: User[]
  selectedChat: ChatUser | null
  selectedUser: User | null
  handleSeletedChat: (user: User | null) => Promise<void | null>
  getCurrentUser: () => CurrentUserMetadata | null
  handleAddMessage: (message: Message) => void
}

export const ChatContext = createContext<ChatContextProps | null>(null)
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? '', {
  extraHeaders: {
    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
  }
})


interface ChatContextProviderProps {
  children: ReactNode
  users: User[]
}

const ChatContextProvider = ({
  children,
  users: data
}: ChatContextProviderProps) => {
  const session = useSession()
  const [users, setUsers] = useState<User[]>(data)
  const [selectedChat, setSelectedChat] = useState<ChatUser | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  // crear chat component

  const handleSeletedChat = useCallback(async (user: User | null) => {
    if (user === null) {
      setSelectedChat(null)
      setSelectedUser(null)
      return
    }
    if (user.id === selectedUser?.id) return
    const res = await fetch(`/api/chat?recipient=${user?.id}`)
    if (!res.ok) {
      return null
    }
    const chatUser = await res.json()
    setSelectedUser(user)
    setSelectedChat(chatUser)
    console.log(chatUser)
  }, [selectedUser])

  const handleAddMessage = useCallback((message: Message) => {
    if (!selectedChat) return
    setSelectedChat({
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        message
      ]
    })
  }, [selectedChat])

  const getCurrentUser = useCallback(() => {
    if (session.status === 'authenticated') {
      return session.data.user as CurrentUserMetadata
    }
    return null
  }, [session])


  const values = useMemo(() => ({
    users,
    selectedChat,
    selectedUser,
    handleSeletedChat,
    getCurrentUser,
    handleAddMessage
  }), [users, selectedChat, selectedUser, handleSeletedChat, getCurrentUser, handleAddMessage])

  return (
    <ChatContext.Provider value={values}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider