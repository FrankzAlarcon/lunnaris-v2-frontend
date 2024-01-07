interface GenericIdValue {
  id: number
  value: string
}

export interface Media {
  id: string
  title: string
  synopsis: string
  year: number
  mediaType: GenericIdValue
  poster: string
  thumb: string
  file: string
  genres:GenericIdValue[]
  duration: number
}

export interface Genre extends GenericIdValue {}