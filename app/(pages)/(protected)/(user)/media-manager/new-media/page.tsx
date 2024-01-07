import React from 'react'
import MultimediaForm from '../_components/multimedia-form'
import { getGenres } from '@/actions/get-genres'

const NewMediaPage = async () => {
  // get genres
  const genres = await getGenres()
  if (!genres) {
    return (
      <div>
        Ha ocurrido un error
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-white p-4'>
      <h1 className='text-3xl font-bold '>Gestión de medios</h1>
      <div>
        <p className='text-center font-bold text-xl py-4'>Registro de multimedia</p>
        <MultimediaForm genres={genres} />
      </div>
    </div>
  )
}

export default NewMediaPage