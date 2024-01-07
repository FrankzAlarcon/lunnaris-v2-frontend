'use client'

import { useMemo, useState } from 'react'
import Header from './common/header'
import { useMediaManagement } from '@/hooks/useMediaManagement'

const FileList = () => {
  const [fileSearch, setFileSearch] = useState('')
  // change to files
  const { files } = useMediaManagement()
  const filteredMedia = useMemo(() => {
    if (!fileSearch) {
      return files
    }
    return files.filter((file) => file.title.toLowerCase().includes(fileSearch.toLowerCase()))
  }, [files, fileSearch])
  return (
    <div>
    <p className="pt-2 pb-4 font-bold text-lg">Archivos</p>
      <Header
        search={fileSearch}
        setSearch={setFileSearch}
        link='/media-manager/new-file'
      />
    </div>
  )
}

export default FileList