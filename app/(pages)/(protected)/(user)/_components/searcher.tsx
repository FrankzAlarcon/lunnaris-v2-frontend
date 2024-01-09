'use client'

import { Input } from '@/components/ui/input'
import { Film, Loader, Search } from 'lucide-react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDebounce, useIsMounted } from 'usehooks-ts'
import Notification from './notification'
import { useMediaManagement } from '@/hooks/useMediaManagement'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Media } from '@/interfaces/media'
import Image from 'next/image'
import { NEXT_PUBLIC_BACKEND_URL } from '@/config'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Searcher = () => {
  const [value, setValue] = useState('')
  const { media } = useMediaManagement()
  const debouncedValue = useDebounce(value, 600)
  const [filteredMedia, setFilteredMedia] = useState<Media[]>([])
  const router = useRouter()
  const isMounted = useIsMounted()

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }

  useEffect(() => {
    const searchMovie = async () => {
      if (debouncedValue === '') {
        setFilteredMedia([])
        return 
      }
      setFilteredMedia(media.filter((m) => m.title.toLowerCase().includes(debouncedValue.toLowerCase())))
      console.log('searching...', debouncedValue)
    }
    searchMovie()
  }, [debouncedValue, media])

  if (!isMounted) return null

  return (
    <div className='w-full lg:w-1/2 flex gap-4 lg:mx-auto lg:justify-center p-2'>
      <div className='relative flex w-full lg:mx-auto bg-white/20 backdrop-blur-sm rounded-3xl'>
        <Popover open={value !== ''}>
          <PopoverTrigger className='w-full' asChild >
            <div className='w-full relative'> 
              <Input
                className='w-full rounded-3xl bg-transparent text-white placeholder:text-white placeholder:italic pr-10'
                type='text'
                value={value}
                onChange={handleSearch}
                placeholder='Buscar...'
                />
              <Search className='absolute right-4 top-2 text-white' />
            </div>
          </PopoverTrigger>
            <PopoverContent className='w-60 sm:w-96 md:w-[500px] bg-black/80'>
              {
                debouncedValue === '' && (
                  <div className='w-full flex justify-center'>
                    <Loader className='text-white h-5 w-5 animate-spin' />
                  </div>
                )
              }
              {
                debouncedValue && (
                  <div className='w-full flex flex-col gap-2'>
                    {
                      filteredMedia.length === 0 && (
                        <div className='w-full flex justify-center'>
                          <p className='text-white'>No se encontraron resultados</p>
                        </div>
                      )
                    }
                    {
                      filteredMedia.map((m) => (
                        <Button key={m.id} onClick={() => router.push(`/movies/${m.id}`)} className='flex items-center justify-start gap-2 w-full h-8 bg-transparent hover:bg-white/10' size='sm'>
                          <Film className='h-5 w-5 text-white' />
                          <p className='text-white'>{m.title}</p>
                        </Button>
                      ))
                    }
                  </div>
                )
              }
            </PopoverContent>
        </Popover>
      </div>
      <div>
        <Notification />
      </div>
    </div>
  )
}

export default Searcher