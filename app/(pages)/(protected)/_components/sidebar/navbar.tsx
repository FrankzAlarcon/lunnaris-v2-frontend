import React from 'react'
import NavbarWrapper from './wrapper'
import Toggle, { ToggleSkeleton } from './toggle'
import Navigation, { NavigationSkeleton } from './navigation'
import { getUser } from '@/actions/get-user'

const Navbar = async () => {
  const user = await getUser("12345")
  console.log(user)
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
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r bg-[#2D2E35] z-50'>
      <ToggleSkeleton />
      <NavigationSkeleton />
    </aside>
  )
}

export default Navbar