import { Movie } from '@/interfaces/movie'
import Image from 'next/image'
import Link from 'next/link'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({
  movie
}: MovieCardProps) => {
  return (
    <Link className='relative block w-[230px] h-[340px]' href={`movies/${movie.slug}`}>
      <div className='w-full h-full'>
        <div className='absolute top-0 left-0 w-full h-full'>
          <Image
            src={movie.image}
            alt={movie.name}
            width={230}
            height={340}
          />
        </div>
        <div className='z-10'>
          <p>{movie.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard