import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { Skeleton } from "./ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const avatarSizes = cva(
  '',
  {
    variants: {
      size: {
        default: 'h-8 w-8',
        lg: 'h-14 w-14'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  },
)

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string
  image: string
}

const UserAvatar = ({
  image,
  username,
  size
}: UserAvatarProps) => {
  
  return (
    <div className="relative">
      <Avatar
        className={cn(
          'ring-2 ring-green-400 border border-background',
          avatarSizes({ size })          
        )}
      >
        <AvatarImage src={image} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {}
    </div>
  )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({
  size
}: UserAvatarSkeletonProps) => {
  return (
    <Skeleton
      className={cn(
        'rounded-full',
        avatarSizes({ size })
      )}
    />
  )
}

export default UserAvatar