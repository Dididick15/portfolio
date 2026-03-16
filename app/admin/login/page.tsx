import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510]">
      <div className="w-full max-w-sm space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-white">Admin</h1>
          <p className="text-sm text-white/40">Accedi al pannello di controllo</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
