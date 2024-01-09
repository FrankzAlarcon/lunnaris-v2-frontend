import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface VideoHeaderProps {
  title: string
}

const VideoHeader = ({
  title
}: VideoHeaderProps) => {
  return (
    <div className='relative flex items-center w-full h-full px-2'>
      <div className='flex items-center'>
        <Link href='/home'>
          <Button className='text-white hover:bg-white/10' variant='link'>
            <ArrowLeft />
          </Button>
        </Link>
        <div className='text-white'>
          <p className='text-xs'>Estas viendo</p>
          <p className='text-white text-xl font-bold'>{title}</p>
        </div>
      </div>
      <div>
        x
      </div>
    </div>
  )
}

export default VideoHeader