'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  search: string
  setSearch: (search: string) => void
  placeholder?: string
  link: string
}

const Header = ({
  search,
  setSearch,
  placeholder = 'Buscar',
  link 
}: HeaderProps) => {
  const router = useRouter()

  const handleLink = () => {
    router.push(link)
  }

  return (
    <div className='flex gap-4 w-full lg:w-1/2'>
      <div className='relative w-full flex items-center'>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className='rounded-full w-full pr-10'
        />
        <Search className='h-5 w-5 absolute right-4' />
      </div>
      <div>
        <Button onClick={handleLink} className='flex gap-1 items-center rounded-full text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white' variant='outline'>
          <Plus className='h-5 w-5' />
          <span>Nuevo</span>
        </Button>
      </div>
    </div>
  )
}

export default Header