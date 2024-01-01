import React from 'react'
import Users from './_components/users/users'
import { getChatsUsers } from '@/actions/get-chats'
import Chats from './_components/messages/chat'

const ChatPage = async () => {
  const chats = await getChatsUsers()
  return (
    <div className='min-h-screen lg:flex'>
      <div className='min-w-[384px]'>
        <Users chats={chats} />
      </div>
      <div className='w-full'>
        <Chats />
      </div>
    </div>
  )
}

export default ChatPage