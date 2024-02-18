interface GenericIdValue {
  id: number
  value: string
}

interface GenericIdUrl {
  id: string
  url: string
}

export interface Media {
  id: string
  title: string
  synopsis: string
  year: number
  mediaType: GenericIdValue
  poster: GenericIdUrl
  thumb: GenericIdUrl
  file: GenericIdUrl
  genres:GenericIdValue[]
  duration: number
}

export interface Genre extends GenericIdValue {}