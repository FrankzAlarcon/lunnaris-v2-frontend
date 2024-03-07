'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { useMediaManagement } from '@/hooks/useMediaManagement'
import { Genre } from '@/interfaces/media'
import { createMultimediaSchema } from '@/schemas/multimedia.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
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
  const [file, setFile] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getFile = async () => {
      if (!value) return
      setLoading(true)
      const response = await fetch(`/api/file/${value}`)
      const data = await response.json()
      setFile(data)
      setLoading(false)
    }
    getFile()
  }, [value])
  return (
    <div className='border border-dashed p-2 rounded-xl'>
      <p className='pb-2 text-muted-foreground text-center'>Vista Previa</p>
      <div className='w-full min-h-60'>
        { !file && (
          <div className='w-full min-h-60 flex items-center justify-center bg-gray-200'>
            {loading && (
              <Loader className='h-6 w-6 animate-spin' />
            )}
            {!loading && (
              <p className='text-muted-foreground text-center'>No se ha seleccionado un archivo</p>
            )}
          </div>
        )}
        {
          type === 'image' && value && file && (
            <Image
              className='w-full h-full bg-gray-200'
              src={file?.url}
              alt="image"
              width={200}
              height={200}
            />
          )
        }
        {
          type === 'video' && value && file && (
            <video
              ref={videoRef}
              onLoadedData={handleDuration}
              className='w-full h-full bg-gray-200'
              src={file?.url}
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
  const { addMedia, files } = useMediaManagement()

  const handleDuration = (evt: SyntheticEvent<HTMLVideoElement, Event>) => {
    form.setValue('duration', String(videoRef.current?.duration))
  }

  const onSubmit = async (values: z.infer<typeof createMultimediaSchema>) => {
    try {
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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className='w-full'
                    >
                      {
                        field.value ? field.value : 'Seleccionar poster'
                      }
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full max-h-80 overflow-scroll'>
                  <Command>
                    <CommandInput placeholder='Selecciona un poster' className='h-10' />
                    <CommandEmpty>No se ha seleccionado un poster</CommandEmpty>
                    <CommandGroup>
                      {
                        files.map((file) => {
                          if (file.mimetype.includes('image')) {
                            return (
                              <CommandItem key={file.id} value={file.displayName} className='flex items-center gap-2'
                                onSelect={() => {
                                  form.setValue('poster', file.id)
                                }}
                              >
                                <Image
                                  src={file.url}
                                  alt='poster'
                                  width={50}
                                  height={50}
                                />
                                <span>{file.displayName}</span>
                              </CommandItem>
                            )
                          }
                        })
                      }
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className='w-full'
                    >
                      {
                        field.value ? field.value : 'Seleccionar video'
                      }
                    </Button>
                    {/* <Input type='text' placeholder='Poster (ID de la imagen)' disabled={form.formState.isSubmitting} {...field}/> */}
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full max-h-80 overflow-y-scroll'>
                  <Command>
                    <CommandInput placeholder='Selecciona un video' className='h-10' />
                    <CommandEmpty>No se ha seleccionado un video</CommandEmpty>
                    <CommandGroup>
                      {
                        files.map((file) => {
                          if (file.mimetype.includes('video')) {
                            return (
                              <CommandItem key={file.id} value={file.displayName} className='flex items-center gap-2 w-full'
                                onSelect={() => {
                                  form.setValue('file', file.id)
                                }}
                              >
                                <video
                                  src={file.url}
                                  width={70}
                                  height={70}
                                />
                                <span>{file.displayName}</span>
                              </CommandItem>
                            )
                          }
                        })
                      }
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormControl>
                <Input type='text' placeholder='Video (ID del video)' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl> */}
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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className='w-full'
                    >
                      {
                        field.value ? field.value : 'Seleccionar thumnail'
                      }
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full max-h-80 overflow-scroll'>
                  <Command>
                    <CommandInput placeholder='Selecciona un thumbnail' className='h-10' />
                    <CommandEmpty>No se ha seleccionado un poster</CommandEmpty>
                    <CommandGroup>
                      {
                        files.map((file) => {
                          if (file.mimetype.includes('image')) {
                            return (
                              <CommandItem key={file.id} value={file.displayName} className='flex items-center gap-2'
                                onSelect={() => {
                                  form.setValue('thumb', file.id)
                                }}
                              >
                                <Image
                                  src={file.url}
                                  alt='thumbnail'
                                  width={50}
                                  height={50}
                                />
                                <span>{file.displayName}</span>
                              </CommandItem>
                            )
                          }
                        })
                      }
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormControl>
                <Input type='text' placeholder='Thumbnail (ID de la imagen)' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl> */}
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