'use client'
import { loginFormSchema } from '@/schemas/form.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRegister } from '@/hooks/use-register'
import toast from 'react-hot-toast'


const LoginForm = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { onGoRegister } = useRegister()

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      setIsLoading(true)
      const result = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false
      })
      if (result?.error) {
        toast.error("Usuario o contraseña incorrectos")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form className='w-full p-2 space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
        <p className="text-center text-sm ">¡Saludos, ingresa tus credenciales para iniciar!</p>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input placeholder='Usuario' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Contraseña' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <div className='w-full pt-4 flex justify-center'>
          <Button type='submit' className='w-full bg-green-500 rounded-3xl max-w-xs mx-auto hover:bg-green-400' disabled={isLoading}>
            {
              isLoading ? (
                <Loader className='h-6 w-6 animate-spin cursor-pointer' />
              ) : (
                'Ingresar'
              )
            }
          </Button>
        </div>
      </form>
      <p className='text-center text-sm py-2'>¿No tienes cuenta? <Button onClick={onGoRegister} className='w-fit h-fit bg-transparent mx-auto mb-4 p-0 text-green-500 hover:underline hover:bg-transparent'>Regístrate</Button></p>
    </Form>
  )
}

export default LoginForm