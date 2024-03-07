'use client'

import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/user-avatar"
import { useChat } from "@/hooks/use-chat"
import useChatManagement from "@/hooks/use-chat-management"
import { cn } from "@/lib/utils"
import { ArrowLeft, MessageSquareDot } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"
import ChatInput from "./chat-input"
import { useEffect, useState } from "react"
import { socket } from "@/context/chat-context-provider"
import { Message as IMessage, SendMessage } from "@/interfaces/user"
import toast from "react-hot-toast"
import Message from "./message"

const Chats = () => {
  const matches = useMediaQuery(
    '(max-width: 1024px)'
  )
  // const isMounted = useIsMounted()
  const { hidden, onShow } = useChat((state) => state)
  const { selectedUser, selectedChat, handleSeletedChat, getCurrentUser, handleAddMessage } = useChatManagement()
  const currentUser = getCurrentUser()
  const [input, setInput] = useState('')
  const hide = !hidden && matches

  const handleBack = () => {
    handleSeletedChat(null)
    onShow()
  }

  useEffect(() => {
    socket.on('receive_message', (message: IMessage) => {
      console.log('message received', message)
      handleAddMessage(message)

      socket.emit('message_received', message)
    })
  }, [handleAddMessage])

  const handleOnEmitMessage = () => {
    if (!input) return console.log('no hay mensaje')
    if (!selectedChat) return toast.error('Seleccione un chat')
    if (!currentUser) return toast.error('No hay usuario actual')
    if (!selectedUser) return toast.error('No hay destinatario')
    const messageDto: SendMessage = {
      content: input.trim(),
      sender: currentUser.id,
      recipient: selectedUser.id,
      timestamp: Date.now(),
    }
    console.log("sending chat", socket.connected, messageDto)
    socket.emit('send_message', messageDto)
    handleAddMessage({
      ...messageDto,
      id: String(Date.now()),
      sender: {
        id: currentUser.id,
        fullName: currentUser.fullName
      },
      recipient: {
        id: selectedUser.id,
        fullName: selectedUser.fullName
      }
    })
    setInput('')
  }
  return (
    <div className={cn(
      'w-full bg-green-50 h-screen max-h-screen',
      hide ? 'hidden' : 'block'
    )}>
      {
        !selectedUser ? (
          <div className="flex flex-col items-center justify-center gap-8 h-full">
            <p className="text-5xl text-green-500 font-black">Seleccione un chat</p>
            <MessageSquareDot className="w-32 h-32 text-green-500" />
          </div>
        ) : (
          <div className="h-full w-full">
            <div className="flex items-center gap-2 w-full bg-white py-1 h-14">
              {
                matches && (
                  <Button onClick={handleBack} variant='ghost' className="">
                    <ArrowLeft />
                  </Button>
                )
              }
              <div className="flex gap-4 w-full justify-start items-center py-2 pl-3 h-auto rounded-none" >
                <UserAvatar image={selectedUser?.fullName as string} username={selectedUser?.fullName as string}/>
                <div className="flex flex-col items-start">
                  <span className="font-bold">{selectedUser?.fullName}</span>
                </div>
              </div>
            </div>
            <div className="p-2 flex flex-col h-[calc(100%-56px)] justify-between overflow-y-scroll">
              <div className="flex flex-col gap-2 p-2">
                {
                  selectedChat && selectedChat.messages?.map((message) => {
                    return (
                      <Message key={message.id} currentUserId={currentUser?.id as string}  message={message} />
                    )
                  })
                }
              </div>
              <div className="h-20">
                <ChatInput value={input} setValue={setInput} onEmit={handleOnEmitMessage}/>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Chats