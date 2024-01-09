import { getCurrentUser } from "@/actions/getCurrentUser"
import { BACKEND_URL } from "@/config"
import { NextResponse } from "next/server"

export async function DELETE(
  _req: Request,
  { params }: { params: { fileId?: string } },
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse('Unauthorized', {
        status: 401,
      })
    }
    const response = await fetch(`${BACKEND_URL}/file/${params.fileId}/`, {
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

    const media = await response.json()
    return NextResponse.json(media.body)
  } catch (error) {
    console.log('[DELETE_FILE_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
  }
}