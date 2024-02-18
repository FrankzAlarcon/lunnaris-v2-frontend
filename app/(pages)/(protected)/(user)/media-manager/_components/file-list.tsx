'use client'

import { useMemo, useState } from 'react'
import Header from './common/header'
import { useMediaManagement } from '@/hooks/useMediaManagement'
import { FileVideo } from 'lucide-react'
import { FileTable } from './result-table'
import toast from 'react-hot-toast'

const FileList = () => {
  const [fileSearch, setFileSearch] = useState('')
  // change to files
  const { files, removeOneFile } = useMediaManagement()
  const filteredFiles = useMemo(() => {
    if (!fileSearch) {
      return files
    }
    return files.filter((file) => file.id.toLowerCase().includes(fileSearch.toLowerCase()))
  }, [files, fileSearch])

  const handleDeleteFile = async (fileId: string) => {
    try {
      const res = await fetch(`/api/file/${fileId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        return toast.error('Ha ocurrido un error')
      }
      removeOneFile(fileId)
      toast.success(`Archivo ${fileId} eliminado`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
    <p className="pt-2 pb-4 font-bold text-lg">Archivos</p>
      <Header
        search={fileSearch}
        setSearch={setFileSearch}
        link='/media-manager/new-file'
      />
      <div className='w-full pt-4 md:w-3/4'>
        {
          filteredFiles?.length > 0 ? (
            <FileTable  filesMetadata={filteredFiles} onAction={handleDeleteFile} />
          ) : (
            <p className="flex flex-col items-center justify-center text-green-500 font-bold pt-4">
              <FileVideo className="h-20 w-20" />
              <span className="text-xl pt-2">No hay archivos</span>
              <span className="text-base font-light">Agrega una nueva imagen o video</span>
            </p>
          )
        }
      </div>
    </div>
  )
}

export default FileList