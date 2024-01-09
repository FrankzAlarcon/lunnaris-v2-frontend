'use client'

import { Message as IMessage } from "@/interfaces/user"
import { cn } from "@/lib/utils"

interface MessageProps {
  currentUserId: string
  message: IMessage
}

const Message = ({
  currentUserId,
  message
}: MessageProps) => {
  const isSender = currentUserId === message.sender.id
  return (
    <div className={cn(
        `w-fit px-2 rounded-lg bg-white shadow-md py-2 flex flex-col gap-2`,
        isSender ? 'self-end' : 'self-start'
      )
    }>
      <p className="text-green-500 font-semibold">
        {isSender ? 'Tu' : message.sender.fullName}
      </p>
      <p className="">
        {message.content}
      </p>
    </div>
  )
}

export default Message