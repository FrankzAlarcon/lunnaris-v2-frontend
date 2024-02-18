import React from 'react'
import { getMedia, getMovies } from '@/actions/get-media'
import CarouselPosters from '../_components/movie/carousel-posters'
import Searcher from '../_components/searcher'
import MovieList from '../_components/movie/movie-list'

const HomePage = async () => {
  const movies = await getMovies()
  const media = await getMedia()
  if (!movies || !media) {
    return (
      <div>
        Ha ocurrido un error
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className='relative'>
        <div className='absolute z-10 top-0 w-full flex gap-8 justify-center'>
          <Searcher />
        </div>
        <CarouselPosters />
      </div>
      <p className='text-white pl-4 py-4 text-2xl'>Podría interesarte</p>
      <MovieList />
    </div>
  )
}

export default HomePage