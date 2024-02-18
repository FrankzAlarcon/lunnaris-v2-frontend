import { getCurrentUser } from "@/actions/getCurrentUser"
import { FILES_SERVICE_URL } from "@/config"
import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: { fileId?: string } },
) {
  try {
    console.log('[GET_FILE]')
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse('Unauthorized', {
        status: 401,
      })
    }
    console.log(`${FILES_SERVICE_URL}/file/${params.fileId}`)
    const response = await fetch(`${FILES_SERVICE_URL}/file/${params.fileId}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    })
    console.log(response)
    if (!response.ok) {
      console.log(await response.text())
      return new NextResponse('Error al obtener el registro', {
        status: 400,
      })
    }

    const file = await response.json()
    console.log(file)
    return NextResponse.json(file.data)
  } catch (error) {
    console.log('[GET_FILE_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
  }
}

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
    const response = await fetch(`${FILES_SERVICE_URL}/file/${params.fileId}`, {
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

    const file = await response.json()
    return NextResponse.json(file.data)
  } catch (error) {
    console.log('[DELETE_FILE_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
  }
}