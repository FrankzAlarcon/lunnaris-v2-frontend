import { getCurrentUser } from '@/actions/getCurrentUser'
import { redirect } from 'next/navigation'
import { UserType } from '@/enums/user-type.enum'

const MediaManagerLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const user = await getCurrentUser()
  if (!user) {
    return redirect('/')
  }
  if (user.userType.id !== UserType.MEDIA_MANAGER) {
    return redirect('/')
  }
  return (
    <div>
      Media Manager Layout
      {children}
    </div>
  )
}

export default MediaManagerLayout