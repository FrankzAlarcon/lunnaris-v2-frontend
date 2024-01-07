'use client'
import Hint from '@/components/hint'
import { Pause, Play, RotateCcw, RotateCw } from 'lucide-react'

interface VideoControlsProps {
  isPaused: boolean
  onTogglePlay: () => void
  onAdvance: () => void
  onGoBack: () => void

}

const VideoControls = ({
  isPaused,
  onTogglePlay,
  onAdvance,
  onGoBack
}: VideoControlsProps) => {
  const PlayingIcon = isPaused ? Play : Pause
  const label = isPaused ? 'Reproducir' : 'Pausar'
  return (
    <div className='flex items-center gap-3 text-white'>
      <Hint label='Retroceder 10 segundos' asChild>
        <button
          onClick={onGoBack}
        >
          <RotateCcw className='w-5 h-5 hover:scale-110 transition-all duration-300' />
        </button>
      </Hint>
      <Hint label={label} asChild>
        <button
          onClick={onTogglePlay}
        >
          <PlayingIcon className='w-5 h-5 hover:scale-110 transition-all duration-300' />
        </button>
      </Hint>
      <Hint label='Avanzar 10 segundos' asChild>
        <button
          onClick={onAdvance}
        >
          <RotateCw className='w-5 h-5 hover:scale-110 transition-all duration-300' />
        </button>
      </Hint>
    </div>
  )
}

export default VideoControls