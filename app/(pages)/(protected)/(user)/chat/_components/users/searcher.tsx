'use client'

import { Input } from '@/components/ui/input'
import { User } from 'lucide-react'

interface SearcherProps {
  value: string
  setValue: (value: string) => void    
}

const Searcher = ({
  value,
  setValue
}: SearcherProps) => {
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