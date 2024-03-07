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
    console.log(user.token)
    const response = await fetch(`${CHAT_SERVICE_URL}/chats/recipient/${params.get('recipient')}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    console.log(response)
    if (!response.ok) {
      console.log(await response.text())
      return new NextResponse('Error al obtener chats', {
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