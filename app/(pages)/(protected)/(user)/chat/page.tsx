import React from 'react'
import Users from './_components/users/users'
import { getUsers } from '@/actions/get-chats'
import Chats from './_components/messages/chat'
import ChatContainer from './_components/chat-container'
import ChatContextProvider from '@/context/chat-context-provider'

const ChatPage = async () => {
  const users = await getUsers()

  if (!users) {
    return (
      <div>
        <p>No hay usuarios</p>
      </div>
    )
  }
  return (
    <ChatContextProvider users={users}>
      <ChatContainer>
        <div className='min-h-screen lg:flex'>
          <div className='min-w-[384px]'>
            <Users />
          </div>
          <div className='w-full'>
            <Chats />
          </div>
        </div>
      </ChatContainer>
    </ChatContextProvider>
  )
}

export default ChatPage