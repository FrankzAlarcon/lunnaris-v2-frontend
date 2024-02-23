'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRegister } from "@/hooks/use-register"
import { newPasswordSchema } from "@/schemas/form.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

interface NewPasswordFormProps {
  token: string
}

const NewPasswordForm = ({
  token
}: NewPasswordFormProps) => {
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
    try {
      setIsLoading(true)
      if (values.password !== values.confirmPassword) {
        return toast.error('Las contraseñas no coinciden', {
          className: 'text-sm'
        })
      }
      console.log({
        token,
        password: values.password
      })
      const response = await fetch('/api/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          password: values.password
        })
      })
      console.log(response)
      if (!response.ok) {
        return toast.error('El token no es válido', {
          className: 'text-sm'
        })
      }
      toast.success('Contraseña actualizada. Ahora puedes iniciar sesión', {
        duration: 5000
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form className='w-full p-2 space-y-2' onSubmit={form.handleSubmit(onSubmit)}>
        <p className="text-center text-sm ">¡Saludos, ingresa tu nueva contraseña!</p>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder='Contraseña' disabled={form.formState.isSubmitting} {...field}/>
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repita su contraseña</FormLabel>
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
                'Guardar'
              )
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default NewPasswordForm