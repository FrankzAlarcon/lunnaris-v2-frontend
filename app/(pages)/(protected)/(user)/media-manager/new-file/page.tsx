'use client'
import { useState } from 'react'
import UploadFile from '../_components/upload-file'
import { FileMetadata } from '@/interfaces/movie'
import { Loader } from 'lucide-react'
import ResultTable from '../_components/result-table'

const NewFilePage = () => {
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleNewFile = (value: FileMetadata) => {
    setFileMetadata({
      id: value.id,
      tag: value.tag,
      type: value.type
    })
  }
  return (
    <div className='min-h-screen bg-white p-4'>
      <h1 className='text-3xl font-bold '>Gestión de medios</h1>
      <div>
        {!isLoading && !fileMetadata && (
          <UploadFile
            setIsLoading={setIsLoading}
            handleNewFile={handleNewFile}
          />
        )}
        {
          !isLoading && fileMetadata && (
            <ResultTable fileMetadata={fileMetadata} setFileMetadata={setFileMetadata} />
          )
        }
        {isLoading && (
          <p className='pt-10 w-10 mx-auto text-center text-green-500'>
            <Loader className='h-10 w-10 animate-spin' />
          </p>
        )}
      </div>
    </div>
  )
}

export default NewFilePage