import { AUTH_SERVICE_URL, USERS_SERVICE_URL } from "@/config";
import { CreateUserDto, LoginDto, ResetPasswordDto } from "@/interfaces/auth";

export const login = async (data: LoginDto): Promise<{ token: string, id: string } | null> => {
  console.log('[login]', data)
  const res = await fetch(`${AUTH_SERVICE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  console.log(res)
  if (!res.ok) {
    console.log(await res.text())
    return null
  }

  const json = await res.json()
  console.log({json})
  return json.body
}

export const registerUser = async (data: CreateUserDto): Promise<{ id: string } | null> => {
  console.log('[register]', data)
  const response = await fetch(`${USERS_SERVICE_URL}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  console.log(response)
  if (![200, 201].includes(response.status)){
    console.log(await response.text())
    return null
  }

  const json = await response.json();
  console.log({json})
  return json.body;
}

export const requestResetPassword = async (email: string): Promise<boolean> => {
  const response = await fetch(`${AUTH_SERVICE_URL}/auth/reset_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    console.log(await response.text())
    return false
  }

  return true
}

export const resetPassword = async (data: ResetPasswordDto): Promise<boolean> => {
  const response = await fetch(`${AUTH_SERVICE_URL}/auth/reset_password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    console.log(await response.text())
    return false
  }

  return true
}