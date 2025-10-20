import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoPNP from "../assets/imagenes/logoPNP.png";
import usuarioIcon from "../assets/imagenes/usuario.png";
import contraseñaIcon from "../assets/imagenes/contraseña.png";
import ocultarIcon from "../assets/imagenes/ocultar.png";
import verIcon from "../assets/imagenes/ver.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("userToken", data.token || "");
        navigate("/dashboard");
      } else {
        setError(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error en el servidor");
    }
  };

  return (
    <div className="flex h-screen w-full">

      {/* Panel Izquierdo */}
      <div className="hidden md:flex w-1/2 h-full bg-gradient-to-br from-green-700 to-yellow-400 items-center justify-center">
        <div className="text-center px-6">
          <img src={logoPNP} alt="Logo PNP" className="object-contain w-64 h-64 mx-auto" />
          <h2 className="text-white text-4xl font-bold mt-6">
            Bienvenido a Mesa de Partes Digital
          </h2>
        </div>
      </div>

      {/* Panel Derecho */}
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center bg-gray-100 p-4 md:p-10">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
            Iniciar Sesión
          </h1>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">

            {/* Usuario */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5">
                <img src={usuarioIcon} alt="Icono usuario" width={20} height={20} />
              </span>
              <input
                type="text"
                name="username"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Contraseña */}
            <div className="relative">
              <span className="absolute left-4 top-4.5 text-gray-400 text-lg pointer-events-none">
                <img src={contraseñaIcon} alt="Icono candado" width={20} height={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700 transition text-gray-900 placeholder-gray-400"
              />
              <span
                className="absolute right-4 top-4.5 cursor-pointer text-gray-400 text-lg select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? ocultarIcon : verIcon}
                  alt="Mostrar contraseña"
                  width={20}
                  height={20}
                />
              </span>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-4 rounded-xl font-semibold hover:bg-green-800 active:scale-95 transition transform"
            >
              Ingresar
            </button>

            <a
              href="#"
              className="text-center text-sm text-green-700 hover:underline mt-2"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
