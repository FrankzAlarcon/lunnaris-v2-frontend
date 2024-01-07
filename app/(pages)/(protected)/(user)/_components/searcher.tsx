'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'
import Notification from './notification'

const Searcher = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 600)

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }

  useEffect(() => {
    const searchMovie = async () => {
      if (debouncedValue === '') return
      console.log('searching...', debouncedValue)
    }
    searchMovie()
  }, [debouncedValue])
  return (
    <div className='w-full lg:w-1/2 flex gap-4 lg:mx-auto lg:justify-center p-2'>
      <div className='relative flex w-full lg:mx-auto bg-white/20 backdrop-blur-sm rounded-3xl'>
        <Input
          className='w-full rounded-3xl bg-transparent text-white placeholder:text-white placeholder:italic pr-10'
          type='text'
          value={value}
          onChange={handleSearch}
          placeholder='Buscar...'
        />
        <Search className='absolute right-4 top-2 text-white' />
      </div>
      <div>
        <Notification />
      </div>
    </div>
  )
}

export default Searcher