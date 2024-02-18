'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useMediaManagement } from '@/hooks/useMediaManagement'
import { Media } from '@/interfaces/media'
import { formatTime } from '@/lib/format-time'
import { Check, Play, Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface MovieDetailsCardProps {
  movie: Media
}

const MovieDetailsCard = ({
  movie
}: MovieDetailsCardProps) => {
  const router = useRouter()
  const { user, addMediaToUser, removeMediaToUser } = useMediaManagement()
  const isAdded = user?.seeLater.includes(movie.id)
  
  return (
    <Card className='w-full h-full p-0 rounded-none border-none'>
      <CardContent className='h-full w-full p-0'>
        <Image
          src={movie.poster.url}
          alt={movie.title}
          className='w-full h-full object-cover object-top'
          width={600}
          height={450}
        />
        <div className='absolute z-20 top-32 left-10 '>
          <p className='text-6xl font-bold text-white uppercase md:w-3/4'>{movie.title}</p>
          <p className='text-white py-4 md:w-1/3'>{movie.synopsis}</p>
          <p className='text-gray-400 py-4'>{formatTime(movie.duration)}</p>
          <div className='flex gap-2'>
            <Button
              onClick={() => router.push(`/video/${movie.id}`)}
              className='bg-[#57CF2C] rounded-2xl hover:bg-lime-400 duration-500'>
              <Play />
              <span className='ml-2'>Ver ahora</span>
            </Button>
            {
              isAdded ? (
                <Button onClick={() => removeMediaToUser(movie.id)} className='bg-white text-black rounded-2xl hover:bg-gray-200 hover:shadow hover:shadow-white duration-500'>
                  <Check />
                  <span className='ml-2'>Agregado</span>
                </Button>
              ) : (
                <Button onClick={() => addMediaToUser(movie.id)} className='border-2 border-white rounded-2xl duration-500 text-white' variant='ghost'>
                  <Plus />
                  <span className='ml-2'>Ver más tarde</span>
                </Button>
              )
            }
          </div>
        </div>
        <div className='absolute z-10 w-full h-full top-0 left-0 bg-gradient-to-t from-black ' />
      </CardContent>
    </Card>
  )
}

export default MovieDetailsCard