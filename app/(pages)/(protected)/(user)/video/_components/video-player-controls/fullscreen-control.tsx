'use client'
import Hint from '@/components/hint'
import { Maximize, Minimize } from 'lucide-react' 

interface FullscreenControlProps {
  isFullscreen: boolean
  onToggle: () => void
}

const FullscreenControl = ({
  isFullscreen,
  onToggle
}: FullscreenControlProps) => {
  const Icon = isFullscreen ? Minimize : Maximize
  const label = isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'



  return (
    <div className='flex items-center justify-end pr-2 gap-4 w-[8rem]'>
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className='text-white p-1.5 hover:bg-white/10 rounded-lg'
        >
          <Icon
            className='w-5 h-5'
          />
        </button>
      </Hint>
      
    </div>
  )
}

export default FullscreenControl