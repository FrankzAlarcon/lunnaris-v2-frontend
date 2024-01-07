'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useMediaManagement } from '@/hooks/useMediaManagement'
import Autoplay from 'embla-carousel-autoplay'
import { useMemo } from 'react'
import MovieDetailsCard from './movie-details-card'

const autoplayOptions = {
  delay: 4000,
  rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  jump: true
}

const CarouselPosters = () => {
  const { media } = useMediaManagement()
  const movies = useMemo(() => media.slice(0, 5), [media])
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
          movies.map((movie) => (
            <CarouselItem key={movie.id} className='relative pl-0 basis-full w-full h-full'>
              <MovieDetailsCard movie={movie} />
            </CarouselItem>
          ))
        }
      </CarouselContent>
    </Carousel>
  )
}

export default CarouselPosters