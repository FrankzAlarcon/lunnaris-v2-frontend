'use client'

import { Media } from "@/interfaces/media"
import { FileMetadata } from "@/interfaces/movie"
import { User } from "@/interfaces/user"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

export interface MediaManagementContextProps {
  media: Media[]
  addMedia: (media: Media) => void
  removeOneMedia: (id: string) => void
  files: FileMetadata[]
  addFile: (file: any) => void
  removeOneFile: (id: string) => void
  user: User | null
  addMediaToUser: (mediaId: string) => void
  addUser: (user: User) => void
}

export const MediaManagementContext = createContext<MediaManagementContextProps | null>(null)

interface MediaManagementProviderProps {
  children: React.ReactNode
  data: Media[]
  files: FileMetadata[]
}

const MediaManagementProvider = ({
  children,
  data,
  files:dataFiles
}: MediaManagementProviderProps) => {
  const [media, setMedia] = useState<Media[]>(data)
  const [files, setFiles] = useState<FileMetadata[]>(dataFiles)
  const [user, setUser] = useState<User | null>(null)
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (user) return 
    if (session?.status === 'authenticated') {
      fetch('/api/current')
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Bienvenido!`, {
            className: '!bg-[#2F2F2F] !text-white',
          })
          localStorage.setItem('token', session.data.jwt ?? '')
        }
        return res.json()
      })
      .then(({url, user}) => {
        setUser(user)
      })
    }
  }, [session, router, user])

  const addUser = useCallback((user: User) => {
    console.log(user)
    setUser(user)
  }, [])

  const addMediaToUser = useCallback(async (mediaId: string) => {
    if (!user) {
      return toast.error('Debes iniciar sesión')
    }
    const response = await fetch(`/api/user/see-later`, {
      method: 'POST',
      body: JSON.stringify({
        media: mediaId
      })
    })
    if (response.ok) {
      toast.success('Agregado a tu lista')
    }
    const data = await response.json()
    setUser({
      ...user,
      seeLater: [
        ...user.seeLater,
        data.id
      ]
    })
  }, [user])
  
  const addMedia = useCallback((newValue: Media) => {
    setMedia([newValue, ...media])
  }, [media])

  const removeOneMedia = useCallback((id: string) => {
    setMedia(media.filter(m => m.id !== id))
  }, [media])

  const addFile = useCallback((newValue: any) => {
    setFiles([newValue, ...files])
  }, [files])

  const removeOneFile = useCallback((id: string) => {
    setFiles(files.filter(f => f.id !== id))
  }, [files])

  const values = useMemo(() => ({
    media,
    files,
    user,
    addMedia,
    removeOneMedia,
    addFile,
    removeOneFile,
    addMediaToUser,
    addUser
  }), [media, addMedia, removeOneMedia, files, addFile, removeOneFile, user, addMediaToUser, addUser])

  return (
    <MediaManagementContext.Provider value={values}>
      {children}
    </MediaManagementContext.Provider>
  )
}

export default MediaManagementProvider