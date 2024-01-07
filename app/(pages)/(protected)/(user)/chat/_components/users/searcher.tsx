'use client'

import { Input } from '@/components/ui/input'
import { User } from 'lucide-react'
import React from 'react'

const Searcher = () => {
  const [value, setValue] = React.useState('')
  return (
    <div className='relative'>
      <Input
        placeholder='Buscar chats'
        className='pr-10'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <User className='text-gray-500 absolute right-2 top-2' />
    </div>
  )
}

export default Searcher