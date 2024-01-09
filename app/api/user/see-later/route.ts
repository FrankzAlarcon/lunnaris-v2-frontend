import { getCurrentUser } from "@/actions/getCurrentUser"
import { BACKEND_URL } from "@/config"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse('Unauthorized', {
        status: 401,
      })
    }

    const body = await req.json()

    const reqData = {
      media: body.media,
    }
    const response = await fetch(`${BACKEND_URL}/user/see_later`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    })
    
    console.log(response.status)

    if (response.status !== 200) {
      console.log(await response.text())
      return new NextResponse('Error al crear el registro', {
        status: 400,
      })
    }

    const media = await response.json()
    return NextResponse.json(media.body)
  } catch (error) {
    console.log('[CREATE_USER_FAVORITE_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
    
  }
}