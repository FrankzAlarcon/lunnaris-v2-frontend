'use client'
import { useState } from 'react'
import UploadFile from '../_components/upload-file'
import { FileMetadata } from '@/interfaces/movie'
import { ArrowLeft, Loader } from 'lucide-react'
import ResultTable from '../_components/result-table'
import Link from 'next/link'
import { useMediaManagement } from '@/hooks/useMediaManagement'

const NewFilePage = () => {
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null)
  const {addFile} = useMediaManagement()
  const [isLoading, setIsLoading] = useState(false)

  const handleNewFile = (value: FileMetadata) => {
    setFileMetadata(value)
    addFile(value)
  }
  return (
    <div className='min-h-screen bg-white p-4'>
      <div className='flex gap-4 items-center'>
        <Link href="/media-manager">
          <ArrowLeft className='w-8 h-8' />
        </Link>
        <h1 className='text-3xl font-bold '>Gestión de Archivos</h1>  
      </div>
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