import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import React from 'react'

const Notification = () => {
  return (
    <div className='bg-white/20 backdrop-blur-sm rounded-full '>
      <Button className='hover:bg-transparent rounded-full border-2 border-transparent hover:border-white' variant='ghost'>
        <Bell className='text-white' />
      </Button>
    </div>
  )
}

export default Notification