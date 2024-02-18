'use client'
import { useMemo } from 'react'
import MovieCard from './movie-card'
import { useMediaManagement } from '@/hooks/useMediaManagement'
import { useAuth } from '@/hooks/use-auth'
import { VideoOff } from 'lucide-react'

interface MovieListProps {
  seeLater?: boolean
}

const MovieList = ({
  seeLater = false
}: MovieListProps) => {
  const { media } = useMediaManagement()
  const { user } = useMediaManagement()
  const data = useMemo(() => {
    if (!seeLater) {
      return media
    }
    // return user?.seeLater.map((id) => media.find((m) => m.id === id))
    return media.filter((m) => user?.seeLater.includes(m.id))
  }, [media, user?.seeLater, seeLater])

  return (
    <div className='flex flex-col items-center gap-8 pb-8 px-2 md:flex-row md:flex-wrap md:justify-center'>
      {
        data.length === 0 && (
          <div className='w-full py-10 flex flex-col items-center justify-center gap-2'>
            <VideoOff className='h-20 w-20 text-white' />
            <p className='text-white text-lg font-bold'>Aún no has añadido contenido a tu lista</p>
          </div>
        )
      }
      {
        data?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      }
    </div>
  )
}

export default MovieList