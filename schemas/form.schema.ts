import z from 'zod'

export const loginFormSchema = z.object({
  username: z.string().min(3, {
    message: 'El usuario debe tener al menos 3 caracteres'
  }),
  password: z.string().min(4, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }),
})

export const registerFormSchema = z.object({
  firstName: z.string().min(3, {
    message: 'El nombre debe tener al menos 3 caracteres'
  }),
  lastName: z.string().min(3, {
    message: 'El apellido debe tener al menos 3 caracteres'
  }),
  phone: z.string().length(10, {
    message: 'El teléfono debe tener 10 numeros'
  }),
  username: z.string().min(3, {
    message: 'El usuario debe tener al menos 3 caracteres'
  }),
  email: z.string().email({
    message: 'El email debe ser válido'
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }),
  confirmPassword: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }),
})

export const searcherSchema = z.object({
  search: z.string(),
})