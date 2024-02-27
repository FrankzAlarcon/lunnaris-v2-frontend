import React, { Suspense } from 'react'
import Navbar, { NavbarSkeleton } from './_components/sidebar/navbar'
import Container from './_components/container'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { redirect } from 'next/navigation'
import MediaManagementProvider from '@/context/media-management-provider'
import { getFilesMetadata, getMedia } from '@/actions/get-media'

const UserLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const user = await getCurrentUser()
  if (!user) {
    return redirect('/')
  }
  const media = await getMedia()
  const files = await getFilesMetadata()
  if (media === null || files === null) {
    return (
      <p>Ha ocurrido un error</p>
    )
  }
  // if (user.userType.id !== UserType.USER) {
  //   return redirect('/')
  // }
  return (
    <div>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar user={user} />
      </Suspense>
      <MediaManagementProvider data={media} files={files}>
        <Container>
          {children}
        </Container>
      </MediaManagementProvider>
    </div>
  )
}

export default UserLayout