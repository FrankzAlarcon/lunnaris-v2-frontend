'use client'
import { useNavbar } from '@/hooks/use-navbar'
import { Route } from '@/interfaces/route'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavbarItemProps {
  route: Route
}

const NavbarItem = ({
  route
}: NavbarItemProps) => {
  const pathname = usePathname()
  const {collapsed} = useNavbar((state) => state)
  const isActive = pathname === route.path
  return (
    <Link href={route.path}>
      <div className={cn(
        'p-2 pl-3 flex gap-4 hover:bg-white/10 duration-500 rounded-md rounded-l-none',
        isActive && 'border-l-2 border-l-[#57CF2C]'
      )}>
        <route.Icon
          className={cn(
            'w-6 h-6',
            isActive ? 'text-[#57CF2C]' : 'text-white'
          )}
        />
        {!collapsed && (
          <p className={cn(
            'text-white',
            isActive && 'text-[#57CF2C]'
          )}>{route.name}</p>
        )}
      </div>
    </Link>
  )
}

export default NavbarItem