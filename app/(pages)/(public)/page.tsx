'use client'
import { useRegister } from "@/hooks/use-register";
import LoginForm from "./_components/login-form";
import RegisterForm from "./_components/register-form";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ResetPasswordForm from "./_components/reset-password-form";

export default function Auth() {
  const { formType } = useRegister()
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.status === 'authenticated') {
      // router.push('/home')
    }
  }, [session, router])
  return (
    <main className="bg-login-hero w-screen h-screen bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-[2px] absolute bg-black/25 w-screen min-h-screen h-full top-0 left-0"></div>
      <div className="relative z-10 w-full h-full flex justify-center items-center p-2 shadow-md">
        <div className="w-full max-w-xl p-4 bg-white rounded-lg">
          <h1 className="text-center text-3xl py-2 font-bold">Lunnaris</h1>
          <div>
          {
              formType === 'login' && <LoginForm />
            }
            {
              formType === 'register' && <RegisterForm />
            }
            {
              formType === 'reset-password' && <ResetPasswordForm />
            }
          </div>
        </div>
      </div>
    </main>
  )
}
