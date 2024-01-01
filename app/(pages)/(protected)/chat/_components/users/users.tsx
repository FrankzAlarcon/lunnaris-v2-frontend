'use client'

import { useChat } from '@/hooks/use-chat'
import Searcher from './searcher'
import UserChatItem from './user-chat-item'
import { ChatUser } from '@/interfaces/user'
import { useMediaQuery } from 'usehooks-ts'
import { cn } from '@/lib/utils'

interface UsersProps {
  chats: ChatUser[]
}

const Users = ({chats}: UsersProps) => {
  const matches = useMediaQuery(
    '(max-width: 1024px)'
  )
  const { hidden } = useChat((state) => state)
  const hide = hidden && matches
  return (
    <div className={cn(
      'w-full bg-white h-screen px-2 py-4 lg:max-w-sm',
      hide ? 'hidden' : 'block'
    )}>
      <p className='text-3xl font-bold'>Chats</p>
      <div className='py-4'>
        <Searcher />
      </div>
      <div className='flex flex-col gap-1'>
        {
          chats.map((chat) => (
            <UserChatItem key={chat.id} chat={chat} />
          ))
        }
      </div>
    </div>
  )
}

export default Users