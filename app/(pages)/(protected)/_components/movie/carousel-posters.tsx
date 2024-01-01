'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Poster } from '@/interfaces/movie'
import Autoplay from 'embla-carousel-autoplay'
import { Play, Plus } from 'lucide-react'
import Image from 'next/image'

const autoplayOptions = {
  delay: 4000,
  rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  jump: true
}

interface CarouselPostersProps {
  posters: Poster[]
}

const CarouselPosters = ({
  posters
}: CarouselPostersProps) => {
  return (
    <Carousel
      className='h-[65vh] w-full overflow-hidden relative'
      plugins={[Autoplay(autoplayOptions)]}
      opts={{
        loop: true,
        align: 'center',
      }}
    >
      <CarouselContent className='absolute top-0 left-0 w-full h-full m-0'>
        {
          posters.map((poster) => (
            <CarouselItem key={poster.id} className='relative pl-0 basis-full w-full h-full'>
              <Card className='w-full h-full p-0 rounded-none border-none'>
                <CardContent className='h-full w-full p-0'>
                  <Image
                    src={poster.image}
                    alt={poster.name}
                    className='w-full h-full object-cover object-top'
                    width={600}
                    height={450}
                  />
                  <div className='absolute z-20 top-32 left-10 '>
                    <p className='text-6xl font-bold text-white uppercase md:w-3/4'>{poster.name}</p>
                    <p className='text-gray-400 py-4'>2h 35m 2023</p>
                    <div className='flex gap-2'>
                      <Button className='bg-[#57CF2C] rounded-2xl hover:bg-lime-400 duration-500'>
                        <Play />
                        <span className='ml-2'>Ver ahora</span>
                      </Button>
                      <Button className='border-2 border-white rounded-2xl duration-500 text-white' variant='ghost'>
                        <Plus />
                        <span className='ml-2'>Ver más tarde</span>
                      </Button>
                    </div>
                  </div>
                  <div className='absolute z-10 w-full h-full top-0 left-0 bg-gradient-to-t from-black ' />
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        }
      </CarouselContent>
    </Carousel>
  )
}

export default CarouselPosters