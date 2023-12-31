import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import UserAvatar from "@/components/user-avatar"
import { useNavbar } from "@/hooks/use-navbar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface UserItemProps {
  username: string
  image: string
}

const UserItem = ({
  username,
  image,
}: UserItemProps) => {
  const pathname = usePathname()
  const { collapsed } = useNavbar((state) => state)
  const href = `/user/${username}`
  const isActive = pathname === href
  return (
    <Button
      asChild
      variant='ghost'
      className={cn(
        'w-full h-12 hover:bg-white/10 hover:bg-opacity-10',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div className={cn(
          'flex items-center w-full gap-x-4',
          collapsed && 'justify-center'
        )}>
          <UserAvatar image={image} username={username} />
          {!collapsed && (
            <p className="truncate text-white">
              {username}
            </p>
          )}
        </div>
      </Link>
    </Button>
  )
}

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton
          className='h-6'
        />
      </div>
    </li>
  )
}

export default UserItem