
'use client'

import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/user-avatar"
import { useChat } from "@/hooks/use-chat"
import { ChatUser, User } from "@/interfaces/user"

interface UserChatItemProps {
  chat: User
}

const UserChatItem = ({
  chat
}: UserChatItemProps) => {
  const { onHide } = useChat((state) => state)
  const handleChat = () => {
    onHide()
  }
  return (
    <Button onClick={handleChat} className="flex gap-2 w-full justify-start py-2 h-auto rounded-none" variant='ghost'>
      <UserAvatar image={chat.fullName} username={chat.fullName}/>
      <div className="flex flex-col items-start">
        <span className="font-bold">{chat.fullName}</span>
        <span className="text-sm text-gray-600 font-light">Hola, como estas?</span>
      </div>
    </Button>
  )
}

export default UserChatItem