import z from 'zod'

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%$!¡¿?#&])[A-Za-z\d@%$!¡¿?#&]{12,50}$/

export const loginFormSchema = z.object({
  email: z.string().min(3, {
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
  email: z.string().email({
    message: 'El email debe ser válido'
  }),
  password: z.string().min(12, {
    message: 'La contraseña debe tener al menos 12 caracteres'
  }).regex(PASSWORD_REGEX, {
    message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial @%$!¡¿?#&'
  }),
  confirmPassword: z.string().min(12, {
    message: 'La contraseña debe tener al menos 12 caracteres'
  }).regex(PASSWORD_REGEX, {
    message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial @%$!¡¿?#&'
  }),
})

export const searcherSchema = z.object({
  search: z.string(),
})

export const resetPasswordSchema = z.object({
  email: z.string().email({
    message: 'El email debe ser válido'
  }),
})

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }).regex(PASSWORD_REGEX, {
    message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial @%$!¡¿?#&'
  }),
  confirmPassword: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }).regex(PASSWORD_REGEX, {
    message: 'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial @%$!¡¿?#&'
  }),
})
/*
Las reglas para la contraseña son
12 a 50 caracteres
Una minúscula
Una mayúscula
Un número
Un carácter especial @%$!¡¿?#&
*/