'use client'

import { useMemo, useState } from "react"
import Header from "./common/header"
import { Media } from "@/interfaces/media"
import { useMediaQuery } from "usehooks-ts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileVideo2 } from "lucide-react"
import { formatTime } from "@/lib/format-time"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMediaManagement } from "@/hooks/useMediaManagement"
import toast from "react-hot-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import DeleteAlert from "./common/delete-alert"

interface MediaListProps {
  media: Media[]
}

const MediaTable = ({
  media,
}: MediaListProps) => {
  const {removeOneMedia} = useMediaManagement()
  const handleDeleteMedia = async (id: string) => {
    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        return toast.error('Ha ocurrido un error')
      }
      removeOneMedia(id)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-green-500 font-bold">ID</TableHead>
            <TableHead className="text-green-500 font-bold">Título</TableHead>
            <TableHead className="text-green-500 font-bold">Año</TableHead>
            <TableHead className="text-green-500 font-bold">Duración</TableHead>
            <TableHead className="text-green-500 font-bold">Género</TableHead>
            <TableHead className="text-green-500 font-bold">Sinopsis</TableHead>
            <TableHead className="text-green-500 font-bold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            media.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.id}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>{formatTime(movie.duration)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {
                      movie.genres?.map(genre => (
                        <span key={genre.id} className="bg-gray-200 rounded-full px-3 py-1 text-xs">{genre.value}</span>
                      ))
                    }
                  </div>
                </TableCell>
                <TableCell>{movie.synopsis}</TableCell>
                <TableCell>
                  <DeleteAlert
                    itemId={movie.id}
                    itemTitle={movie.title}
                    onAction={handleDeleteMedia}
                  />
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

const MediaCard = ({
  media,
}: MediaListProps) => {
  const {removeOneMedia} = useMediaManagement()
  const handleDeleteMedia = async (id: string) => {
    removeOneMedia(id)
  }
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {
        media.map((movie) => (
          <Card key={movie.id} className="px-2 w-72">
            <CardHeader>
              <CardTitle>{movie.title}</CardTitle>
              <CardDescription>{movie.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="pb-2">
                <span className="font-bold block text-green-500">Sinopsis</span>
                {movie.synopsis}
              </p>
              <p className="pb-2">
                <span className="font-bold text-green-500">Año: </span>
                {movie.year}
              </p>
              <p>
                <span className="font-bold text-green-500">Duración: </span>
                {formatTime(movie.duration)}
              </p>
            </CardContent>
            <CardFooter className="border-t p-2 flex flex-col px-0">
              <div className="pb-2 w-full">
                {
                  movie.genres?.map(genre => (
                    <span key={genre.id} className="bg-gray-200 rounded-full px-3 py-1 mr-2 text-xs">{genre.value}</span>
                  ))
                }
              </div>
              <div className="w-full border-t pt-2 flex justify-center">
                  <DeleteAlert
                    itemId={movie.id}
                    itemTitle={movie.title}
                    onAction={handleDeleteMedia}
                  />
              </div>
            </CardFooter>
          </Card>
        ))
      }
    </div>
  )
}

const MediaList = () => {
  const matches = useMediaQuery(
    '(max-width: 900px)'
  )
  const [mediaSearch, setMediaSearch] = useState('')
  const { media } = useMediaManagement()
  const filteredMedia = useMemo(() => {
    if (!mediaSearch) {
      return media
    }
    return media.filter((movie) => movie.title.toLowerCase().includes(mediaSearch.toLowerCase()))
  }, [media, mediaSearch])
  return (
    <div>
      <p className="pt-2 pb-4 font-bold text-lg">Multimedia</p>
      <Header
        search={mediaSearch}
        setSearch={setMediaSearch}
        link='/media-manager/new-media'
      />
      <div className="py-2">
        {
          filteredMedia.length === 0 ? (
            <p className="flex flex-col items-center justify-center text-green-500 font-bold pt-4">
              <FileVideo2 className="h-20 w-20" />
              <span className="text-xl pt-2">No hay multimedia</span>
              <span className="text-base font-light">Agrega una nueva pelicula o serie</span>
            </p>
          ) : (
            matches ? (
                <MediaCard media={filteredMedia} />
              ) : (
                <MediaTable media={filteredMedia} />
            )
          )
        }
      </div>
    </div>
  )
}

export default MediaList