'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_SOCKET_URL } from '@/config'
import { useRegister } from '@/hooks/use-register'
import { resetPasswordSchema } from '@/schemas/form.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const { onGoLogin } = useRegister()
  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        console.log(await response.text())
        return toast.error('El email ingresado no existe o no es válido', {
          className: 'text-sm'
        })
      }
      console.log(response)
      toast.success('Se ha enviado un correo con instrucciones para reestablecer tu contraseña')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form className='w-full p-2 space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
        <p className="text-center text-sm ">¡Ingresa tus email para recibir instrucciones!</p>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder='Correo electrónico' disabled={form.formState.isSubmitting} {...field}/>
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
      <p className='text-center text-sm pt-2'>¿Ya tienes una cuenta? <Button onClick={onGoLogin} className='w-fit h-fit bg-transparent mx-auto mb-4 p-0 text-green-500 hover:underline hover:bg-transparent'>Inicia sesión</Button></p>
    </Form>
  )
}

export default ResetPasswordForm