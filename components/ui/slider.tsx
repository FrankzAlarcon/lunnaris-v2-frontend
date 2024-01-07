"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    trackClassName?: string
    rangeClassName?: string
    thumbClassName?: string
  }
>(({ className, trackClassName, rangeClassName,thumbClassName, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className={`relative h-0.5 w-full grow overflow-hidden rounded-full bg-white/10 ${trackClassName}`}>
      <SliderPrimitive.Range className={`absolute h-full bg-white ${rangeClassName}`} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={`block rounded-full border-2 border-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-3.5 w-3.5 ${thumbClassName}`} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
