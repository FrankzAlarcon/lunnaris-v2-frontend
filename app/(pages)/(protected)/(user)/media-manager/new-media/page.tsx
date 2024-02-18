import React from 'react'
import MultimediaForm from '../_components/multimedia-form'
import { getGenres } from '@/actions/get-genres'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

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
      <div className='flex gap-4 items-center'>
        <Link href="/media-manager">
          <ArrowLeft className='w-8 h-8' />
        </Link>
        <h1 className='text-3xl font-bold '>Gestión de medios</h1>  
      </div>
      <div>
        <p className='text-center font-bold text-xl py-4'>Registro de multimedia</p>
        <MultimediaForm genres={genres} />
      </div>
    </div>
  )
}

export default NewMediaPage