'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

interface ChatInputProps {
  value: string
  setValue: (value: string) => void
  onEmit: () => void
}

const ChatInput = ({
  value,
  setValue,
  onEmit
}: ChatInputProps) => {
  return (
    <form 
      className='flex h-full items-center gap-4'
      onSubmit={(evt) => {
        evt.preventDefault()
        onEmit()
      }}
    >
      <Input
        className='w-full'
        placeholder='Escribe un mensaje...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type='submit' size='icon' className='bg-green-500 hover:bg-green-400'>
        <Send />
      </Button>
    </form>
  )
}

export default ChatInput