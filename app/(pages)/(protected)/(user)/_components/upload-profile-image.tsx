import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import React, { useRef } from 'react'

const UploadProfileImage = () => {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const onHandleUpload = () => {
    inputFileRef?.current?.click()
  }
  return (
    <div>
      <div className='pt-4 w-full'>
        <p className='text-center font-bold text-xl'>Carga una foto para tu perfil</p>
        <p className='text-sm text-center pb-4'>Puedes hacerlo ahora o después desde las configuraciones de tu perfil</p>
        <label htmlFor="image" className='border border-dashed border-green-500 py-10 rounded-md flex flex-col items-center justify-center cursor-pointer'>
          <Upload className='h-28 w-28 text-green-500' />
          <p className='text-sm text-green-500'>Sube una imagen para tu perfil!</p>
        </label>
        <input ref={inputFileRef} id='image' type="file" className='hidden' />
        <Button onClick={onHandleUpload} className='w-full bg-green-500 hover:bg-green-400 mt-8 mb-1'>Subir una imagen</Button>
        <div className='w-full flex justify-center'>
          <Button onClick={() => {}} className='w-fit h-fit bg-transparent mx-auto mb-4 p-0 text-green-500 hover:underline hover:bg-transparent'>Continuar sin imagen</Button>
        </div>
      </div>
    </div>
  )
}

export default UploadProfileImage