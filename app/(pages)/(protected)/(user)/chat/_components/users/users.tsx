'use client'

import { useChat } from '@/hooks/use-chat'
import Searcher from './searcher'
import UserChatItem from './user-chat-item'
import { ChatUser, User } from '@/interfaces/user'
import { useMediaQuery } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import useChatManagement from '@/hooks/use-chat-management'

const Users = () => {
  const matches = useMediaQuery(
    '(max-width: 1024px)'
  )
  const { hidden } = useChat((state) => state)
  const { users } = useChatManagement()
  const [search, setSearch] = useState('')
  const hide = hidden && matches
  const filteredUsers = useMemo(
    () => users.filter((user) => user.fullName.toLowerCase().includes(search.toLowerCase())),
    [search, users]
  )
  return (
    <div className={cn(
      'w-full bg-white h-screen px-2 py-4 lg:max-w-sm',
      hide ? 'hidden' : 'block'
    )}>
      <p className='text-3xl font-bold'>Chats</p>
      <div className='py-4'>
        <Searcher  value={search} setValue={setSearch} />
      </div>
      <p className='text-green-500 pb-2 font-bold text-sm'>Usuarios</p>
      <div className='flex flex-col gap-1'>
        {
          filteredUsers.map((user) => (
            <UserChatItem key={user.id} chat={user} />
          ))
        }
      </div>
    </div>
  )
}

export default Users