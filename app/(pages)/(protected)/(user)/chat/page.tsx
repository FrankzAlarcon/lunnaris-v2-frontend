import React from 'react'
import Users from './_components/users/users'
import { getUsers } from '@/actions/get-chats'
import Chats from './_components/messages/chat'
import ChatContainer from './_components/chat-container'

const ChatPage = async () => {
  const users = await getUsers()
  return (
    <ChatContainer>
      <div className='min-h-screen lg:flex'>
        <div className='min-w-[384px]'>
          <Users chats={users} />
        </div>
        <div className='w-full'>
          <Chats />
        </div>
      </div>
    </ChatContainer>
  )
}

export default ChatPage