'use client'
import { registerFormSchema } from '@/schemas/form.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../components/ui/form'
import { Input } from '../../../../components/ui/input'
import { Button } from '../../../../components/ui/button'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Loader, Upload } from 'lucide-react'
import { useRegister } from '@/hooks/use-register'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

enum Steps {
  REGISTER = 'register',
  LOAD_PHOTO = 'load-photo',
  SUMMARY = 'summary',
}

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      confirmPassword: '',
      password: '',
    }
  })
  const router = useRouter()
  const [steps, setSteps] = useState<Steps>(Steps.REGISTER)
  const { onGoLogin } = useRegister()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true)
    if (values.password !== values.confirmPassword) {
      return toast.error('Las contraseñas no coinciden', {
        className: 'text-sm'
      })
    }
    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(values)
    }).then(async (response) => {
      if (!response.ok) {
        const data = await response.text()
        return toast.error(data, {
          className: 'text-sm'
        })
      }
      return response
    }).then(async (res) => {
      console.log(res)
      if (typeof res === 'string') return
      if (!res.ok) return
      signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      }).then(() => {
        router.push('/home')
      })
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const onHandleUpload = () => {
    inputFileRef?.current?.click()
  }

  if (steps === Steps.REGISTER) {
    
  }

  return (
    steps === Steps.REGISTER ? (
      <Form {...form}>
        <form className='w-full p-2 space-y-2 max-h-[75vh] overflow-y-scroll' onSubmit={form.handleSubmit(onSubmit)}>
        <p className="text-center text-sm ">¡Crea una cuenta para disfrutar de tus películas favoritas!</p>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre(s)</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder='Escriba su nombre(s)' {...field}/>
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido(s)</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder='Escriba su apellido(s)' {...field}/>
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder='Escriba su teléfono' {...field}/>
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder='Correo electrónico' {...field}/>
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
                  <Input type='password' disabled={isLoading} placeholder='Contraseña' {...field}/>
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
                  <Input type='password' disabled={isLoading} placeholder='Repetir contraseña' {...field}/>
                </FormControl>
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <div className='w-full pt-4 flex justify-center'>
            <Button type='submit' className='w-full bg-green-500 rounded-3xl max-w-xs mx-auto hover:bg-green-400'>
            {
              isLoading ? (
                <Loader className='h-6 w-6 animate-spin cursor-pointer' />
              ) : (
                'Crear cuenta'
              )
            }
            </Button>
          </div>
        </form>
        <p className='text-center text-sm py-2'>¿Ya tienes cuenta? <Button onClick={onGoLogin} className='w-fit h-fit bg-transparent mx-auto mb-4 p-0 text-green-500 hover:underline hover:bg-transparent'>Iniciar sesión</Button></p>
      </Form>
    ) : (
      <div className='pt-4 w-full'>
        <p className='text-center font-bold text-xl'>Carga una foto para tu perfil</p>
        <p className='text-sm text-center pb-4'>Puedes hacerlo ahora o después desde las configuraciones de tu perfil</p>
        <label htmlFor="image" className='border border-dashed border-green-500 lg:mx-8 py-10 rounded-md flex flex-col items-center justify-center cursor-pointer'>
          <Upload className='h-28 w-28 text-green-500' />
          <p className='text-sm text-green-500'>Sube una imagen para tu perfil!</p>
        </label>
        <input ref={inputFileRef} id='image' type="file" className='hidden' />
        <Button onClick={onHandleUpload} className='w-full bg-green-500 hover:bg-green-400 mt-8 mb-1'>Subir una imagen</Button>
        <div className='w-full flex justify-center'>
          <Button onClick={() => setSteps(Steps.REGISTER)} className='w-fit h-fit bg-transparent mx-auto mb-4 p-0 text-green-500 hover:underline hover:bg-transparent'>Continuar sin imagen</Button>
        </div>
      </div>
    )
  )
}

export default RegisterForm