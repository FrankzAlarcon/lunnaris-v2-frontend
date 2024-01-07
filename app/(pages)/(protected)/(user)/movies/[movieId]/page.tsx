import React from 'react'
import { getOneMedia } from '@/actions/get-media'
import MovieDetailsCard from '../../_components/movie/movie-details-card'

const MovieDetails = async ({ params }: { params: { movieId: string }}) => {
  const media = await getOneMedia(params.movieId)
  if (!media) {
    return (
      <div>
        Ha ocurrido un error
      </div>
    )
  }
  return (
    <div className='relative min-h-screen'>
      <MovieDetailsCard movie={media}  />
    </div>
  )
}

export default MovieDetails