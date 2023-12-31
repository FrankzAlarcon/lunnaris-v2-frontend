'use client'
import { Route } from "@/interfaces/route"
import { Film, HomeIcon, Settings, Tv2, Users } from "lucide-react"
import UserItem, { UserItemSkeleton } from "../user-item"
import NavbarItem from "./navbar-item"

interface NavigationProps {
  user: User
}

export const routes: Route[] = [
  {
    name: 'Inicio',
    path: '/home',
    Icon: HomeIcon
  }, {
    name: 'Series',
    path: '/series',
    Icon: Tv2
  }, {
    name: 'Peliculas',
    path: '/movies',
    Icon: Film
  }, {
    name: 'Social',
    path: '/chat',
    Icon: Users
  }, {
    name: 'Opciones',
    path: '/settings',
    Icon: Settings
  }
]

const Navigation = ({
  user
}: NavigationProps) => {
  return (
    <nav>
      <ul className="space-y-4 px-2">
        <li key={user.id}>
          <UserItem
            image={user.image}
            username={user.name}
          />
        </li>
        {routes.map((route) => (
          <li key={route.path}>
            <NavbarItem route={route}/>
          </li>
        ))}
      </ul>
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