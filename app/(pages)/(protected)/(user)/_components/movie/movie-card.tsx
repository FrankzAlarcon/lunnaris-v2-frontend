import { Media } from '@/interfaces/media'
import Image from 'next/image'
import Link from 'next/link'

interface MovieCardProps {
  movie: Media
}

const MovieCard = ({
  movie
}: MovieCardProps) => {
  return (
    <Link className='relative block w-[230px] h-[340px]' href={`movies/${movie.id}`}>
      <div className='w-full h-full'>
        <div className='top-0 left-0 w-full h-full'>
          <Image
            src={movie.thumb.url}
            alt={movie.title}
            width={230}
            height={340}
            className='w-full h-full object-cover object-top'
          />
        </div>
        <div className='z-20 text-white'>
          <p>{movie.title}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard