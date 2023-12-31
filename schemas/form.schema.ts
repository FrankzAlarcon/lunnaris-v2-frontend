import z from 'zod'

export const loginFormSchema = z.object({
  username: z.string().min(3, {
    message: 'El usuario debe tener al menos 3 caracteres'
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }),
})

export const registerFormSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre debe tener al menos 3 caracteres'
  }),
  username: z.string().min(3, {
    message: 'El usuario debe tener al menos 3 caracteres'
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }),
  email: z.string().email({
    message: 'El email debe ser válido'
  }),
})