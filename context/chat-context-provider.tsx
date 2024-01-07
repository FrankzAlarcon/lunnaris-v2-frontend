'use client'

import { ReactNode, createContext, useMemo } from "react"
import { Socket, io } from 'socket.io-client'

interface ChatContextProps {
  socket: Socket<any, any>
}

const ChatContext = createContext<ChatContextProps | null>(null)
const socket = io('http://localhost:5000')

const ChatContextProvider = ({
  children
}: { children: ReactNode }) => {

  const values = useMemo(() => ({
    socket
  }), [])

  return (
    <ChatContext.Provider value={values}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider