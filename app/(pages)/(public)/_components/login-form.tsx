'use client'
import { loginFormSchema } from '@/schemas/form.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })
  const router = useRouter()

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    console.log(values)
    router.push('/home')
  }
  return (
    <Form {...form}>
      <form className='w-full p-2 space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input placeholder='Usuario' {...field}/>
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
                <Input type='password' placeholder='Contraseña' {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <div className='w-full pt-4 flex justify-center'>
          <Button type='submit' className='w-full bg-green-500 rounded-3xl max-w-xs mx-auto hover:bg-green-400'>Ingresar</Button>
        </div>
      </form>
      <p className='text-center text-sm py-2'>¿No tienes cuenta? <span role='button' className='text-green-500 hover:underline hover:cursor-pointer'>Regístrate</span></p>
    </Form>
  )
}

export default LoginForm