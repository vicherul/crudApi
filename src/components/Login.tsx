import { useState } from "react";

interface LoginProps {
    onLogin: (username: string) => void;
}

const USUARIOS_PERMITIDOS = ["admin", "alumno"]; //( Los dos usuarios validos)

const Login = ({onLogin}: LoginProps) => {
    const [usuario, setUsuario] = useState("");
    const [error, setError] = useState("")


    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if(USUARIOS_PERMITIDOS.includes(usuario.toLocaleLowerCase())){
            localStorage.setItem("frases_user", usuario)
            onLogin(usuario)
        }else{
            setError("Usuario no válido !Espabila")
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Acceso al Sistema</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Introduce tu usuario..."
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login