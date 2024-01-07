'use client'
import MovieCard from './movie-card'
import { useMediaManagement } from '@/hooks/useMediaManagement'

const MovieList = () => {
  const { media } = useMediaManagement()
  return (
    <div className='flex flex-col items-center gap-8 pb-8 md:flex-row md:flex-wrap md:justify-center'>
      {
        media.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      }
    </div>
  )
}

export default MovieList