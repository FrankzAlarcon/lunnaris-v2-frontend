'use client'
import { Route } from "@/interfaces/route"
import { Film, HomeIcon, LogOut, PlayCircle, Users } from "lucide-react"
import UserItem, { UserItemSkeleton } from "../user-item"
import NavbarItem from "./navbar-item"
import { User } from "@/interfaces/user"
import { Button } from "@/components/ui/button"
import Hint from "@/components/hint"
import { signOut } from "next-auth/react"
import { UserType } from "@/enums/user-type.enum"
import { useNavbar } from "@/hooks/use-navbar"

interface NavigationProps {
  user: User
}

export const routes: Route[] = [
  {
    name: 'Inicio',
    path: '/home',
    Icon: HomeIcon,
    usersAllowed: [UserType.USER, UserType.ADMIN, UserType.MEDIA_MANAGER]
  }, {
    name: 'Mi lista',
    path: '/my-list',
    Icon: PlayCircle,
    usersAllowed: [UserType.USER, UserType.ADMIN, UserType.MEDIA_MANAGER]
  }, 
  // {
  //   name: 'Social',
  //   path: '/chat',
  //   Icon: Users,
  //   usersAllowed: [UserType.USER, UserType.ADMIN, UserType.MEDIA_MANAGER]
  // },
  {
    name: 'Gestionar contenido',
    path: '/media-manager',
    Icon: Film,
    usersAllowed: [UserType.ADMIN, UserType.MEDIA_MANAGER]
  }, 
  // {
  //   name: 'Opciones',
  //   path: '/settings',
  //   Icon: Settings,
  //   usersAllowed: [UserType.USER, UserType.ADMIN, UserType.MEDIA_MANAGER]
  // }
]

const Navigation = ({
  user,
}: NavigationProps) => {
  const { collapsed } = useNavbar((state) => state)
  const handleSignOut = () => {
    signOut()
    localStorage.clear()
  }
  return (
    <nav className="flex flex-col justify-between h-full px-2">
      <ul className="space-y-4">
        <li key={user.id}>
          <UserItem
            image={(user as any).image ?? '/imgs/user.png'}
            username={user.fullName}
          />
        </li>
        {routes.filter((route) => route.usersAllowed.includes(user.type.id)).map((route) => (
          <li key={route.path}>
            <NavbarItem route={route}/>
          </li>
        ))}
      </ul>
      <div className="pb-4 w-full">
        <Hint label='Cerrar sesión' side='right' asChild>
          <Button onClick={handleSignOut} className="w-full flex gap-4 bg-transparent text-base text-white justify-start hover:bg-white/10 duration-500 rounded-md rounded-l-none">
            <LogOut className="h-6 w-6"/>
            {
              !collapsed && 'Cerrar sesión'
            }
          </Button>
        </Hint>
      </div>
    </nav>
  )
}

export const NavigationSkeleton = () => {
  return (
    <ul className="px-2 space-y-4">
      {[...Array(6)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}

export default Navigation