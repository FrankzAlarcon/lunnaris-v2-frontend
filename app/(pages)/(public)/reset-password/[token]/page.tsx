import React from 'react'
import NewPasswordForm from '../../_components/new-password-form'
import { getUser } from '@/actions/get-user'

const ResetPasswordPage = ({params}: {params: {token: string}}) => {
  return (
    <main className="bg-login-hero w-screen h-screen bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-[2px] absolute bg-black/25 w-screen min-h-screen h-full top-0 left-0"></div>
      <div className="relative z-10 w-full h-full flex justify-center items-center p-2 shadow-md">
        <div className="w-full max-w-xl p-4 bg-white rounded-lg">
          <h1 className="text-center text-3xl py-2 font-bold">Lunnaris</h1>
          <div>
            <NewPasswordForm token={params.token} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordPage