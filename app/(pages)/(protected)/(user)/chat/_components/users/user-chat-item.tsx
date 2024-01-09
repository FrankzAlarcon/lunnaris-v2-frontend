
'use client'

import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/user-avatar"
import { useChat } from "@/hooks/use-chat"
import useChatManagement from "@/hooks/use-chat-management"
import { User } from "@/interfaces/user"

interface UserChatItemProps {
  chat: User
}

const UserChatItem = ({
  chat
}: UserChatItemProps) => {
  const { onHide } = useChat((state) => state)
  const { handleSeletedChat } = useChatManagement()
  const handleChat = () => {
    handleSeletedChat(chat)
    onHide()
  }
  return (
    <Button onClick={handleChat} className="flex gap-2 w-full justify-start py-2 h-auto rounded-none" variant='ghost'>
      <UserAvatar image={chat.fullName} username={chat.fullName}/>
      <div className="flex flex-col items-start">
        <span className="font-bold">{chat.fullName}</span>
      </div>
    </Button>
  )
}

export default UserChatItem