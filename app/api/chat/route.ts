import { getCurrentUser } from "@/actions/getCurrentUser";
import { CHAT_SERVICE_URL } from "@/config";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      console.log('[current] no user')
      return new NextResponse('Unauthorized', {
        status: 401,
      })
    }

    const params = new URLSearchParams(request.url.split('?')[1])
    console.log(params)
    const response = await fetch(`${CHAT_SERVICE_URL}/chat/?recipient=${params.get('recipient')}&create_flag`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    if (!response.ok) {
      console.log(await response.text())
      return new NextResponse('Error al eliminar el registro', {
        status: 400,
      })
    }
    const json = await response.json()
    console.log(json.body)

    return NextResponse.json(json.body)
  } catch (error) {
    console.log('[GET_CHAT_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
    
  }
}