import { requestResetPassword, resetPassword } from "@/actions/auth"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
) {
  const body = await req.json()
  if (!body.email) {
    return new NextResponse('Todos los campos son requeridos', {
      status: 400,
    })
  }
  const response = await requestResetPassword(body.email)

  if (!response) {
    return new NextResponse('Usuario no encontrado', {
      status: 400,
    })
  }

  return NextResponse.json(response)
}

export async function PUT(
  req: Request,
) {
  const body = await req.json()
  if (!body.token || !body.password) {
    return new NextResponse('Todos los campos son requeridos', {
      status: 400,
    })
  }
  const response = await resetPassword(body)

  if (!response) {
    return new NextResponse('Token no válido', {
      status: 400,
    })
  }

  return NextResponse.json(response)
}