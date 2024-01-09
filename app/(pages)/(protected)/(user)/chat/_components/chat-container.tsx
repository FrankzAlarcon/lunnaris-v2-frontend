'use client'

import { socket } from "@/context/chat-context-provider"
import { useSession } from "next-auth/react"
import { ReactNode, useEffect } from "react"

const ChatContainer = ({
  children
}: {children: ReactNode}) => {
  const session = useSession()
  useEffect(() => {
    if (session.data?.user?.id) {
      socket.emit('join_chat', {
        user: session.data.user.id
      })
    }
  }, [session])

  return (
    <div>
      {children}
    </div>
  )
}

export default ChatContainer