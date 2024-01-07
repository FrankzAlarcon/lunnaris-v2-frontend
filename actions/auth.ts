import { BACKEND_URL } from "@/config";
import { CreateUserDto, LoginDto } from "@/interfaces/auth";

export const login = async (data: LoginDto): Promise<{ token: string, id: string } | null> => {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    return null
  }

  const json = await res.json()

  return json.body
}

export const registerUser = async (data: CreateUserDto): Promise<{ id: string } | null> => {
  const response = await fetch(`${BACKEND_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    return null
  }

  const json = await response.json();

  return json.body;
}