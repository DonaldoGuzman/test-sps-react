import React, { useState } from "react";
import axios from "axios";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

function AddUser() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    type: "user"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await UserService.register(form);
      alert("Usuario registrado con éxito");
      navigate("/users");
      setForm({ name: "", email: "", password: "", type: "user" });
    } catch (error) {
      console.error("Error al registrar usuario", error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Tipo:</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default AddUser;
