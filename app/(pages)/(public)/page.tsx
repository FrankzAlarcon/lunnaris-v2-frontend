'use client'
import { useRegister } from "@/hooks/use-register";
import LoginForm from "./_components/login-form";
import RegisterForm from "./_components/register-form";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Auth() {
  const { isRegister } = useRegister()
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log(session)
    if (session?.status === 'authenticated') {
      fetch('/api/current')
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Bienvenido!`, {
            className: '!bg-[#2F2F2F] !text-white',
          })
          router.push(res.url)
        }
      })
    }
  }, [session, router])
  return (
    <main className="bg-login-hero w-screen h-screen bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-[2px] absolute bg-black/25 w-screen h-screen top-0 left-0"></div>
      <div className="relative z-10 w-full h-full flex justify-center items-center p-2 shadow-md">
        <div className="w-full max-w-xl p-4 bg-white rounded-lg">
          <h1 className="text-center text-3xl py-2 font-bold">Lunnaris</h1>
          <div>
            {
              isRegister ? (
                <RegisterForm />
              ) : (
                <LoginForm />
              )
            }
          </div>
        </div>
      </div>
    </main>
  )
}
