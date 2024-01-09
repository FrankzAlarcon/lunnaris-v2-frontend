import { getCurrentUser } from '@/actions/getCurrentUser'
import { redirect } from 'next/navigation'
import { UserType } from '@/enums/user-type.enum'

const AdminLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const user = await getCurrentUser()
  if (!user) {
    console.log('[No user]', user)
    return redirect('/')
  }
  if (user.userType.id !== UserType.ADMIN) {
    console.log('[No admin]', user)
    return redirect('/')
  }
  console.log('[admin home]', user)
  return (
    <div>
      Admin Layout
      {children}
    </div>
  )
}

export default AdminLayout