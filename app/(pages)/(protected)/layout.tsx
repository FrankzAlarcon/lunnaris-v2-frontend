import React, { Suspense } from 'react'
import Navbar, { NavbarSkeleton } from './_components/sidebar/navbar'
import Container from './_components/container'

const ProtectedPagesLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <Container>
        {children}
      </Container>
    </div>
  )
}

export default ProtectedPagesLayout