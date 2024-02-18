import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getCurrentUser()
    if (!response) {
      console.log('[current] no user')
      return NextResponse.json({
        url: '/'
      }, {
        status: 401,
      })
    }
    console.log('[current]', response)

    // if (response.userType.id === UserType.USER) {
    //   return NextResponse.redirect(new URL('/home', request.url))
    // } else if (response.userType.id === UserType.ADMIN) {
    //   return NextResponse.redirect(new URL('/admin/home', request.url))
    // } else if (response.userType.id === UserType.MEDIA_MANAGER) {
    //   return NextResponse.redirect(new URL('/media-manager/home', request.url))
    // }
    return NextResponse.json({
      url: '/home',
      user: response
    })
  } catch (error) {
    console.log('[REGISTRATION_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
    
  }
}