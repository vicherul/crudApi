import { useEffect, useState } from "react"
import Login from "./components/Login"
import { Dashboard } from "./components/Dashboard"

function App() {
const [usuarioActivo, setUsuarioActivo] = useState<string|null>(null)

// Al cargar la app comprobamos si hay sesion guardada
useEffect(() => {
  const user = localStorage.getItem("frases_user")
  if(user){
    setUsuarioActivo(user)
  }
}, [])

const handleLogout = () => {
  localStorage.removeItem("frases_user")
  setUsuarioActivo(null)
}

  return (
    <>
      {!usuarioActivo ? (
        <Login onLogin={setUsuarioActivo} />
      ): (
        <Dashboard onLogout={handleLogout}/>
      )}
    </>
  )
}

export default App