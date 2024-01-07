import { registerUser } from "@/actions/auth";
import { UserType } from "@/enums/user-type.enum";
import { CreateUserDto } from "@/interfaces/auth";
import { registerFormSchema } from "@/schemas/form.schema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  req: Request,
) {
  try {
    const body: z.infer<typeof registerFormSchema> = await req.json()
    if (Object.values(body).includes('')) {
      return new NextResponse('Todos los campos son requeridos', {
        status: 400,
      })
    }
  
    if (body.password !== body.confirmPassword) {
      return new NextResponse('Las contraseñas no coinciden', {
        status: 400,
      })
    }
  
    const {confirmPassword, ...rest} = body
    const data: CreateUserDto = {
      first_name: rest.firstName,
      last_name: rest.lastName,
      phone: rest.phone,
      username: rest.username,
      email: rest.email,
      password: rest.password,
      user_type: UserType.USER
    }
    const response = await registerUser(data)
  
    if (!response) {
      return new NextResponse('Usuario, email o teléfono ya registrados', {
        status: 400,
      })
    }
  
    return NextResponse.json(response)
  } catch (error) {
    console.log('[REGISTRATION_ERROR]', error)
    return new NextResponse('Internal Error', {
      status: 500,
    })
  }
}