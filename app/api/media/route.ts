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
      title: body.title,
      synopsis: body.synopsis,
      year: Number(body.year),
      media_type: body.mediaType,
      genres: body.genres,
      poster: body.poster,
      thumb: body.thumb,
      file: body.file,
      duration: Number(body.duration),
    }
    const response = await fetch(`${BACKEND_URL}/media/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    })

    if (response.status !== 201 || !response.ok) {
      console.log(await response.text())
      return new NextResponse('Error al crear el registro', {
        status: 400,
      })
    }

    const media = await response.json()
    return NextResponse.json(media.body)
  } catch (error) {
    console.log('[CREATE_MEDIA_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
    
  }
}