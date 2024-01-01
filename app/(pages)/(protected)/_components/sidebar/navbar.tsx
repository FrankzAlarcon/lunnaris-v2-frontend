import React from 'react'
import NavbarWrapper from './wrapper'
import Toggle, { ToggleSkeleton } from './toggle'
import Navigation, { NavigationSkeleton } from './navigation'
import { getUser } from '@/actions/get-user'

const Navbar = async () => {
  const user = await getUser("12345")
  return (
    <NavbarWrapper>
      <Toggle />
      <div className='space-y-4 pt-4 lg:pt-0'>
        <Navigation user={user} />
      </div>
    </NavbarWrapper>
  )
}

export const NavbarSkeleton = () => {
  return (
    <aside className='bg-[#2F2F2F] fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border-r z-50'>
      <ToggleSkeleton />
      <NavigationSkeleton />
    </aside>
  )
}

export default Navbar