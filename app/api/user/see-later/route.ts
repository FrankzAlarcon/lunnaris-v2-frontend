import { getCurrentUser } from "@/actions/getCurrentUser"
import { USERS_SERVICE_URL } from "@/config"
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
    console.log(`${USERS_SERVICE_URL}/users/see_later`)
    console.log(reqData)
    const response = await fetch(`${USERS_SERVICE_URL}/users/see_later/${reqData.media}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
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