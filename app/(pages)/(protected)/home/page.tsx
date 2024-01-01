import React from 'react'
import MovieCard from '../_components/movie/movie-card'
import { getMovies, getPosters } from '@/actions/get-movies'
import CarouselPosters from '../_components/movie/carousel-posters'
import Searcher from '../_components/searcher'

const HomePage = async () => {
  const movies = await getMovies()
  const posters = await getPosters()
  return (
    <div className='min-h-screen'>
      <div className='relative'>
        <div className='absolute z-10 top-0 w-full flex gap-8 justify-center'>
          <Searcher />
        </div>
        <CarouselPosters posters={posters} />
      </div>
      <p className='text-white pl-4 py-4 text-2xl'>Podría interesarte</p>
      <div className='flex flex-col items-center gap-8 pb-8 md:flex-row md:flex-wrap md:justify-center'>
        {
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </div>
    </div>
  )
}

export default HomePage