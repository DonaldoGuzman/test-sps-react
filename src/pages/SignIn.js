import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "../services/UserService"; 

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await UserService.login({ email, password });

      // Suponiendo que tu backend responde con un objeto que incluye token
      if (response.token) {
          localStorage.setItem("token", response.token);
          navigate("/home");
        } else {
          setError("Credenciales inválidas");
        }
    } catch (err) {
      setError("Error al autenticar. Revisa usuario y contraseña.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Contraseña:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: 20 }}>Ingresar</button>
      </form>
    </div>
  );
};

export default SignIn;
