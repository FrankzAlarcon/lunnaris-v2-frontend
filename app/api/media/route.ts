import { getFilesUrl } from "@/actions/get-media"
import { getCurrentUser } from "@/actions/getCurrentUser"
import {  MEDIA_SERVICE_URL } from "@/config"
import { Media } from "@/interfaces/media"
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
    const response = await fetch(`${MEDIA_SERVICE_URL}/media/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    })

    if (![200, 201].includes(response.status)) {
      console.log(await response.text())
      return new NextResponse('Error al crear el registro', {
        status: 400,
      })
    }

    const media = await response.json()
    const filesUrl = await getFilesUrl(
      [media.body.poster, media.body.file, media.body.thumb],
      user.token
    )
    const mediaWithUrl: Media = {
      ...media.body,
      poster: {
        id: media.body.poster,
        url: filesUrl[0]
      },
      file: {
        id: media.body.file,
        url: filesUrl[1]
      },
      thumb: {
        id: media.body.thumb,
        url: filesUrl[2]
      }
    }
    return NextResponse.json(mediaWithUrl)
  } catch (error) {
    console.log('[CREATE_MEDIA_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
    
  }
}