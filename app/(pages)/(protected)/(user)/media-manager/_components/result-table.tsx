'use client'

import { Button } from "@/components/ui/button"
import { FileMetadata } from "@/interfaces/movie"

interface ResultTableProps {
  fileMetadata: FileMetadata
  setFileMetadata: (fileMetadata: FileMetadata | null) => void
}

const ResultTable = ({
  fileMetadata,
  setFileMetadata
}: ResultTableProps) => {
  return (
    <div className="pt-4 w-full md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto">
      <p className="text-center font-bold text-xl pb-4 text-green-500">Tu archivo se ha subido correctamente</p>
      <table className="w-full">
        <thead className="text-green-500 font-bold">
          <tr className="border-b-2 border-b-gray-200">
            <td>Id</td>
            <td>Etiqueta</td>
            <td>Tipo</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">{fileMetadata.id}</td>
            <td className="py-2">
              <span className="bg-gray-200 rounded-full px-3 py-1">{fileMetadata.tag}</span>
            </td>
            <td className="py-2">{fileMetadata.type}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-center font-bold text-lg pt-4 pb-2">Vista previa</p>
      <div className="w-full p-4 border border-dashed rounded-xl">
        {
          fileMetadata.type.includes('image') ? (
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/${fileMetadata.id}`}
              alt="image"
              className="w-full h-full"
            />
          ) : (
            <video
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/${fileMetadata.id}`}
              className="w-full h-full"
              controls
              muted
            />
          )
        }
      </div>
      <div>
        <Button
          onClick={() => setFileMetadata(null)}
          className="w-full mt-4 border-green-500 text-green-500 hover:bg-green-500 hover:text-white duration-300" variant="outline">
          <span>Cargar un nuevo archivo</span>
        </Button>
      </div>
    </div>
  )
}

export default ResultTable