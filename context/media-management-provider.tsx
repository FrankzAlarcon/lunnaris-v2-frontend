'use client'

import { Media } from "@/interfaces/media"
import { createContext, useCallback, useMemo, useState } from "react"

export interface MediaManagementContextProps {
  media: Media[]
  addMedia: (media: Media) => void
  removeOneMedia: (id: string) => void
  files: any[]
  addFile: (file: any) => void
  removeOneFile: (id: string) => void
}

export const MediaManagementContext = createContext<MediaManagementContextProps | null>(null)

interface MediaManagementProviderProps {
  children: React.ReactNode
  data: Media[]
}

const MediaManagementProvider = ({
  children,
  data
}: MediaManagementProviderProps) => {
  const [media, setMedia] = useState<Media[]>(data)
  const [files, setFiles] = useState<any[]>([])
  
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
    addMedia,
    removeOneMedia,
    files,
    addFile,
    removeOneFile
  }), [media, addMedia, removeOneMedia, files, addFile, removeOneFile])

  return (
    <MediaManagementContext.Provider value={values}>
      {children}
    </MediaManagementContext.Provider>
  )
}

export default MediaManagementProvider