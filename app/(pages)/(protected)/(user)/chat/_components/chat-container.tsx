'use client'

import { useSession } from "next-auth/react"
import { ReactNode, useEffect } from "react"
import { io } from "socket.io-client"

// export const socket = io('http://localhost:5000')

const ChatContainer = ({
  children
}: {children: ReactNode}) => {
  // const session = useSession()
  // useEffect(() => {
  //   if (session.data?.user?.id) {
  //     socket.emit('join_chat', session.data.user.id)
  //   }
  // }, [session])

  return (
    <div>
      {children}
    </div>
  )
}

export default ChatContainer