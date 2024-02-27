import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface HintProps {
  label: string
  children: React.ReactNode
  asChild?: boolean
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  isImg?: boolean
}

const Hint = ({
  children,
  label,
  align,
  asChild,
  side,
  isImg = false
}: HintProps) => {
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={align}
        >
          { !isImg && <p className="font-semibold text-xs">{label}</p>}
          { isImg && <Image src={label} alt="hint" className="max-w-[200px] max-h-[200px] object-cover" width={400} height={400} />}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint