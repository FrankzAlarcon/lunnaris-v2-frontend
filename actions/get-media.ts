import { Media } from "@/interfaces/media";
import { FileMetadata, Movie } from "@/interfaces/movie";
import { getCurrentUser } from "./getCurrentUser";
import { FILES_SERVICE_URL, MEDIA_SERVICE_URL } from "@/config";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const getMedia = async (): Promise<Media[] | null> => {
  try {
    const user = await getCurrentUser()

    if (!user) return null
    const res = await fetch(`${MEDIA_SERVICE_URL}/media/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    
    if (!res.ok) {
      console.log(await res.text())
      return null
    }

    const json = await res.json()
    const media = Promise.all(json.body.map(async (item: any) => {
      const files = await getFilesUrl(
        [item.poster, item.file, item.thumb],
        user.token)
      return {
        ...item,
        poster: {
          id: item.poster,
          url: files[0]
        },
        file: {
          id: item.file,
          url: files[1]
        },
        thumb: {
          id: item.thumb,
          url: files[2]
        }
      }
    }))
    return media
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getFilesUrl = async (fileIds: string[], token: string): Promise<string[]> => {
  const urls = await Promise.all(fileIds.map(async (id) => {
    const res = await fetch(`${FILES_SERVICE_URL}/file/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.log(await res.text())
      return ''
    }
    const json = await res.json()
    console.log(json)
    return json.data.url
  }))

  return urls
}

export const getOneMedia = async (id: string): Promise<Media | null> => {
  try {
    const user = await getCurrentUser()

    if (!user) return null

    const res = await fetch(`${MEDIA_SERVICE_URL}/media/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    if (!res.ok) {
      console.log(await res.text())
      return null
    }

    const json = await res.json()
    const files = await getFilesUrl(
      [json.body.poster, json.body.file, json.body.thumb],
      user.token)
    return {
      ...json.body,
      poster: {
        id: json.body.poster,
        url: files[0]
      },
      file: {
        id: json.body.file,
        url: files[1]
      },
      thumb: {
        id: json.body.thumb,
        url: files[2]
      }
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getFilesMetadata = async (): Promise<FileMetadata[] | null> => {
  try {
    const user = await getCurrentUser()

    if (!user) return null

    const res = await fetch(`${FILES_SERVICE_URL}/file`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    console.log('getFilesMetadata', res)
    if (!res.ok) {
      console.log(res.status, res.statusText)
      console.log(await res.text())
      return null
    }

    const json = await res.json()
    const files: FileMetadata[] = json.data.map((item: any): FileMetadata => {
      return {
        id: item.file.id,
        displayName: item.file.displayName,
        mimetype: item.file.mimetype,
        tag: item.file.originalName.split('.').pop() ?? '',
        url: item.url
      }
    })
    return files
  } catch (error) {
    return null
  }
}

export const getPosters = async () => {
  return [
    {
      id: generateId(),
      name: "John Wick Chapter 4",
      image: "/imgs/jhonwick-poster.png",
    }, {
      id: generateId(),
      name: "300",
      image: "/imgs/300-poster.jpg",
    }, {
      id: generateId(),
      name: 'Spiderman - No way home',
      image: "/imgs/nowayhome-poster.jpg",
    }, {
      id: generateId(),
      name: 'Avatar',
      image: "/imgs/avatar-poster.jpg",
    }
  ]

}

export const getMovies = async (): Promise<Movie[]> => {
  return [
    {
      id: generateId(),
      name: "John Wick Chapter 4",
      slug: "john-wick-chapter-4",
      image: "/imgs/johnwick-card.png",
    }, {
      id: generateId(),
      name: "Batman",
      slug: "batman",
      image: "/imgs/batman-card.png",
    }, {
      id: generateId(),
      name: 'Mad Max - Fury Road',
      slug: "mad-max-fury-road",
      image: "/imgs/madmax-card.png",
    }, {
      id: generateId(),
      name: 'Watchmen',
      slug: "watchmen",
      image: "/imgs/watchmen-card.png",
    }
  ]
}