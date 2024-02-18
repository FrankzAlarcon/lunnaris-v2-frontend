import { getCurrentUser } from "@/actions/getCurrentUser"
import { MEDIA_SERVICE_URL, USERS_SERVICE_URL } from "@/config"
import { NextResponse } from "next/server"

export async function DELETE(
  _req: Request,
  { params }: { params: { mediaId?: string } },
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse('Unauthorized', {
        status: 401,
      })
    }
    if (!params.mediaId) {
      return new NextResponse('Missing mediaId', {
        status: 400,
      })
    }
    const response = await fetch(`${USERS_SERVICE_URL}/users/see_later/${params.mediaId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    })

    if (!response.ok) {
      console.log(await response.text())
      return new NextResponse('Error al eliminar el registro', {
        status: 400,
      })
    }
    const deletedMedia = await response.json()
    console.log(deletedMedia)
    return NextResponse.json(deletedMedia.body)
  } catch (error) {
    console.log('[DELETE_FILE_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
  }
}