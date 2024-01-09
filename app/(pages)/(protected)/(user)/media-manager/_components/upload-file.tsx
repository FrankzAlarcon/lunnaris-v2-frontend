'use client'

import { Button } from '@/components/ui/button'
import { FileMetadata } from '@/interfaces/movie'
import { Upload } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { ChangeEvent, useRef } from 'react'
import toast from 'react-hot-toast'

interface UploadFileProps {
  handleNewFile: (value: FileMetadata) => void
  setIsLoading: (value: boolean) => void
}

const UploadFile = ({
  handleNewFile,
  setIsLoading
}: UploadFileProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const session = useSession()

  const onHandleUpload = () => {
    inputFileRef?.current?.click()
  }

  const onUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true)
      const file = e.target.files?.[0]
      if (!file) {
        return toast.error('No se ha seleccionado un archivo')
      }
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${session.data?.jwt}`
        }
      })
  
      if (!response.ok) {
        return toast.error('Ha ocurrido un error al subir el archivo')
      } 
      const uploaded = await response.json()
      handleNewFile({
        id: uploaded.body.id,
        tag: file.name.split('.').pop() ?? '',
        mimetype: file.type
      })
      return toast.success('Archivo subido correctamente')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='pt-4 w-full md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto'>
      <p className='text-center font-bold text-xl'>Carga un archivo</p>
      <p className='text-sm text-center pb-4'>Puedes subir imagenes o videos</p>
      <label htmlFor="image" className='border border-dashed border-green-500 py-10 rounded-md flex flex-col items-center justify-center cursor-pointer'>
        <Upload className='h-28 w-28 text-green-500' />
        <p className='text-sm text-green-500'>Sube una foto video</p>
      </label>
      <input ref={inputFileRef} id='image'
        type="file"
        accept='image/png, image/jpeg, video/mp4'
        className='hidden'
        onChange={onUploadFile}
      />
      <Button
        onClick={onHandleUpload}
        className='w-full bg-green-500 hover:bg-green-400 mt-8 mb-1'
      >Subir una archivo</Button>
    </div>
  )
}

export default UploadFile