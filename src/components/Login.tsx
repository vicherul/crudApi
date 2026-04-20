import { useState } from "react";
import "@/components/login.css";
import perroPiss from "@/assets/perro-piss.png";
import { type AllowedUser, userCredentials } from "@/constants/auth";

interface LoginProps {
    onLogin: (username: string) => void;
}
// Componente de Login contraseña en asteriscos, validación de usuario, mensaje de error y botón de envío con SVG.
const Login = ({onLogin}: LoginProps) => {
  const [formState, setFormState] = useState(() => ({
    usuario: "",
    password: "",
    error: "",
    isSubmitting: false,
  }));
  const { usuario, password, error, isSubmitting } = formState;

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
    setFormState((prev) => ({ ...prev, error: "", isSubmitting: true }));

    const normalizedUser = usuario.trim().toLocaleLowerCase();
    const normalizedPassword = password.trim();
    const isKnownUser = normalizedUser in userCredentials;
    const isValidCredentials =
      isKnownUser &&
      userCredentials[normalizedUser as AllowedUser] === normalizedPassword;
        
        if(isValidCredentials){
            onLogin(usuario)
        }else{
      setFormState((prev) => ({ ...prev, error: "Usuario o contraseña incorrectos", isSubmitting: false }));
        }
    }

  return (
    <div className="login-footer">
      <div className="login-container">
        <img src={perroPiss} alt="perro piss" className="login-bird" />
        <div className="login-card">
          <h2>Acceso al Sistema</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Usuario *" 
              required
              value={usuario}
              onChange={(e) => setFormState((prev) => ({ ...prev, usuario: e.target.value }))}
              disabled={isSubmitting}
            />

            <input
              type="password"
              placeholder="Contraseña *"
              required
              value={password}
              onChange={(e) => setFormState((prev) => ({ ...prev, password: e.target.value }))}
              disabled={isSubmitting}
            />
            
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            <div className="form-bottom">
              <small>* Campos obligatorios</small>
              <button 
                type="submit" 
                className="send-btn"
                disabled={isSubmitting || !usuario.trim() || !password.trim()}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login