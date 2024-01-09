import { BACKEND_URL } from "@/config";
import { CreateUserDto, LoginDto } from "@/interfaces/auth";

export const login = async (data: LoginDto): Promise<{ token: string, id: string } | null> => {
  console.log(`${BACKEND_URL}/auth/login/`)
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
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
  const response = await fetch(`${BACKEND_URL}/user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  console.log(response)
  if (response.status !== 201) {
    console.log(await response.text())
    return null
  }

  const json = await response.json();
  console.log({json})
  return json.body;
}