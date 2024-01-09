'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'
import Hint from '@/components/hint'
import { Slider } from '@/components/ui/slider'

interface VolumeControlProps {
  value: number
  onToggle: () => void
  onChange: (value: number) => void
}

const VolumeControl = ({
  value,
  onChange,
  onToggle
}: VolumeControlProps) => {
  const isMuted = value === 0
  const isAboveHalf = value > 50

  let Icon = Volume1

  if (isMuted) {
    Icon = VolumeX
  } else if (isAboveHalf) {
    Icon = Volume2
  }

  const label = isMuted ? 'Activar sonido' : 'Silenciar'

  const handleChange = (value: number[]) => {
    onChange(value[0])
  }
  return (
    <div className='flex items-center gap-2'>
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
      <Slider
        className='w-[8rem] cursor-pointer'
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  )
}

export default VolumeControl