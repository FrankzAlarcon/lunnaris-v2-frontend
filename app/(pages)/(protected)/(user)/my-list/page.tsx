import React from 'react'
import MovieList from '../_components/movie/movie-list'

const MyListPage = () => {
  return (
    <div className='min-h-screen bg-black p-2 pt-4'>
      <h1 className='text-3xl font-bold text-white'>Gestión de medios</h1>
      <p className=' py-4 text-white pb-8'>Disfruta de las películas que has guardado para ver más tarde</p>  
      <MovieList />
    </div>
  )
}

export default MyListPage