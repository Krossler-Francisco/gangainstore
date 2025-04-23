import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.user);
      navigate("/");
    } else {
      alert(data.error || "Erro ao fazer login.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.user);
      navigate("/");
    } else {
      alert(data.error || "Erro ao registrar.");
    }
  };

  return (
    <div className="login-container">
      <section className="login-content">
        <div className="login-form login-form-line">
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario o correo electrónico *</label>
              <input type="text" id="username" required
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña *</label>
              <input type="password" id="password" required
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <button className="aling" type="submit">Iniciar Sesión</button>
            <p className="forgot-password">¿Olvidaste tu contraseña?</p>
          </form>
        </div>

        <div className="login-form">
          <h1>Registrarse</h1>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario *</label>
              <input type="text" required
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico *</label>
              <input type="email" required
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña *</label>
              <input type="password" required
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
