import LoginForm from "@/app/(pages)/(public)/_components/login-form";

export default function Home() {
  return (
    <main className="bg-login-hero w-screen h-screen bg-cover bg-center bg-no-repeat">
      <div className="backdrop-blur-[2px] absolute bg-black/25 w-screen h-screen top-0 left-0"></div>
      <div className="relative z-10 w-full h-full flex justify-center items-center p-2 shadow-md">
        <div className="w-full max-w-xl p-4 bg-white rounded-lg">
          <h1 className="text-center text-3xl py-2 font-bold">Lunnaris</h1>
          <p className="text-center text-sm ">¡Saludos, ingresa tus credenciales para iniciar!</p>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  )
}
