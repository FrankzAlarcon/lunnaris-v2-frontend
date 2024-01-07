'use client'
import { useNavbar } from '@/hooks/use-navbar'
import { cn } from '@/lib/utils'
import React from 'react'
import { ToggleSkeleton } from './toggle'
import { NavbarSkeleton } from './navbar'
import { useIsClient } from 'usehooks-ts'

interface NavbarWrapperProps {
  children: React.ReactNode
}

const NavbarWrapper = ({
  children
}: NavbarWrapperProps) => {
  const isClient = useIsClient()
  const { collapsed } = useNavbar((state) => state)

  if (!isClient) return (
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#2F2F2F] border-r border-[#2D2E35] z-50'>
      <ToggleSkeleton />
      <NavbarSkeleton />
    </aside>
  )

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-[#2F2F2F] border-r border-[#2D2E35] z-50',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  )
}

export default NavbarWrapper