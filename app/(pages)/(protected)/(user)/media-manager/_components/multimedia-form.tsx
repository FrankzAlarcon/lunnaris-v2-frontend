'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMediaManagement } from '@/hooks/useMediaManagement'
import { Genre } from '@/interfaces/media'
import { createMultimediaSchema } from '@/schemas/multimedia.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface MultimediaFormProps {
  genres: Genre[]
}

interface MultimediaPlaceholderProps {
  type: 'image' | 'video',
  value: string,
  videoRef?: React.RefObject<HTMLVideoElement>
  handleDuration?: (evt: SyntheticEvent<HTMLVideoElement, Event>) => void
}

const MultimediaPlaceholder = ({
  type,
  value,
  handleDuration,
  videoRef
}: MultimediaPlaceholderProps) => {
  return (
    <div className='border border-dashed p-2 rounded-xl'>
      <p className='pb-2 text-muted-foreground text-center'>Vista Previa</p>
      <div className='w-full min-h-60'>
        { !value && (
          <div className='w-full min-h-60 flex items-center justify-center bg-gray-200'>
            <p className='text-muted-foreground text-center'>No se ha seleccionado un archivo</p>
          </div>
        )}
        {
          type === 'image' && value && (
            <img
              className='w-full h-full bg-gray-200'
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/${value}`}
              alt="image"
            />
          )
        }
        {
          type === 'video' && value && (
            <video
              ref={videoRef}
              onLoadedData={handleDuration}
              className='w-full h-full bg-gray-200'
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/${value}`}
              muted
              controls
            />
          )
        }
      </div>
    </div>
  )
}

const MultimediaForm = ({
  genres
}: MultimediaFormProps) => {
  const form = useForm<z.infer<typeof createMultimediaSchema>>({
    resolver: zodResolver(createMultimediaSchema),
    defaultValues: {
      title: '',
      synopsis: '',
      poster: '',
      thumb: '',
      file: '',
      duration: '0',
      genres: [],
      mediaType: 2,
      year: '1900',
    }
  })
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const { addMedia } = useMediaManagement()

  const handleDuration = (evt: SyntheticEvent<HTMLVideoElement, Event>) => {
    form.setValue('duration', String(videoRef.current?.duration))
    console.log(form.getValues())
  }

  const onSubmit = async (values: z.infer<typeof createMultimediaSchema>) => {
    try {
      console.log(values)
      const response = await fetch('/api/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          duration: Number(videoRef.current?.duration ?? form.getValues().duration ?? 0),
        })
      })

      if (response.status === 401) {
        toast.error('Intenta iniciar sesión nuevamente')
      }

      if (!response.ok) {
        toast.error('Ha ocurrido un error')
      }

      const data = await response.json()
      addMedia(data)
      toast.success('¡Se ha creado el registro correctamente!')
      form.reset()
      router.push('/media-manager')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form {...form}>
      <form className='w-full p-2 flex flex-col gap-2 md:w-3/4 lg:w-1/2 mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
        <p className="text-center text-sm ">¡Saludos, ingresa tus credenciales para iniciar!</p>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder='Título' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='synopsis'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sinopsis</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Sinopsis...' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='year'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Año...' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='genres'
          render={() => (
            <FormItem>
              <div>
                <FormLabel>Géneros</FormLabel>
                <FormDescription>Seleccione los géneros necesarios</FormDescription>
              </div>
              <div className='flex gap-2 justify-center flex-wrap'>
                {
                  genres.map((genre) => (
                    <FormField
                      key={genre.id}
                      control={form.control}
                      name='genres'
                      render={({ field }) => (
                        <FormItem
                          key={genre.id}
                          className='flex items-center gap-1 space-y-0 cursor-pointer w-1/4'
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value.includes(genre.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                ? field.onChange([...field.value, genre.id])
                                : field.onChange(field.value.filter((id: number) => id !== genre.id))
                              }}    
                            />
                          </FormControl>
                          <FormLabel
                            className='text-sm cursor-pointer'
                          >{genre.value}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))
                }
              </div>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='poster'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poster</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Poster (ID de la imagen)' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
              <MultimediaPlaceholder type='image' value={field.value} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Video (ID del video)' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
              <MultimediaPlaceholder type='video' videoRef={videoRef} handleDuration={handleDuration} value={field.value} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='duration'
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duración</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Duración...' {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='thumb'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Thumbnail (ID de la imagen)' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
              <MultimediaPlaceholder type='image' value={field.value} />
            </FormItem>
          )}
        />
        <div className='w-full pt-4 flex justify-center'>
          <Button type='submit' className='w-full bg-green-500 rounded-3xl max-w-xs mx-auto hover:bg-green-400'
            disabled={form.formState.isSubmitting}
          >
            {
              form.formState.isSubmitting ? (
                <Loader className='h-6 w-6 animate-spin cursor-pointer' />
              ) : (
                'Guardar'
              )
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default MultimediaForm