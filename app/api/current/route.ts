import { getCurrentUser } from "@/actions/getCurrentUser";
import { UserType } from "@/enums/user-type.enum";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
) {
  try {
    const response = await getCurrentUser()
    if (!response) {
      console.log('[current] no user')
      return NextResponse.redirect(new URL('/', request.url))
    }
    console.log('[current]', response)

    // if (response.userType.id === UserType.USER) {
    //   return NextResponse.redirect(new URL('/home', request.url))
    // } else if (response.userType.id === UserType.ADMIN) {
    //   return NextResponse.redirect(new URL('/admin/home', request.url))
    // } else if (response.userType.id === UserType.MEDIA_MANAGER) {
    //   return NextResponse.redirect(new URL('/media-manager/home', request.url))
    // }
    return NextResponse.redirect(new URL('/home', request.url))
  } catch (error) {
    console.log('[REGISTRATION_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
    
  }
}