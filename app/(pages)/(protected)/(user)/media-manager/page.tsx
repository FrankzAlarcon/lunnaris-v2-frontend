import React from 'react'
import MediaList from './_components/media-list'
import FileList from './_components/file-list'

const MediaManagerPage = async () => {
  return (
    <div className='min-h-screen bg-white p-4'>
      <h1 className='text-3xl font-bold '>Gestión de medios</h1>
      <div>
        <MediaList />
      </div>
      <div>
        <FileList />
      </div>
    </div>
  )
}

export default MediaManagerPage