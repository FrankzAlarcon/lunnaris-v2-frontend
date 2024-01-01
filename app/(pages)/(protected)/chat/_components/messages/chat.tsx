'use client'

import { Button } from "@/components/ui/button"
import { useChat } from "@/hooks/use-chat"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"

const Chats = () => {
  const matches = useMediaQuery(
    '(max-width: 1024px)'
  )
  const { hidden, onShow } = useChat((state) => state)
  const hide = !hidden && matches

  const handleBack = () => {
    onShow()
  }

  return (
    <div className={cn(
      'w-full bg-gray-200 h-screen',
      hide ? 'hidden' : 'block'
    )}>
      <div className="w-full bg-green-500 py-1">
        <Button onClick={handleBack} variant='ghost' className="text-white hover:text-white hover:bg-white/10">
          <ArrowLeft />
        </Button>
      </div>
      <div className="p-2">
        Chats con una persona,
        Añadir pantalla cuando no hay chat seleccionado
      </div>
    </div>
  )
}

export default Chats