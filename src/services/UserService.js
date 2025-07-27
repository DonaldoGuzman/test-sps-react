// src/services/UserService.js
import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Agregar token automáticamente si está presente
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }
            async login(credentials) {
          try {
            const { data } = await this.api.post("/auth/login", credentials);
            return data;
          } catch (error) {
            throw new Error(error.response?.data?.message || "Error al iniciar sesión");
          }
        }
      async register(userData) {
      try {
        const { data } = await this.api.post("/auth/register", userData);
        return data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Error al registrar usuario");
      }
    }

  async list() {
    try {
      const { data } = await this.api.get("/users");
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al listar usuarios");
    }
  }

  async create(userData) {
    try {
      const { data } = await this.api.post("/auth/register", userData);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al crear usuario");
    }
  }

  async update(email, userData) {
    try {
      const { data } = await this.api.post(`/auth/update/${email}`, userData);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al actualizar usuario");
    }
  }

  async delete(email) {
    try {
      const { data } = await this.api.delete(`/auth/users/${email}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al eliminar usuario");
    }
  }
}

export default new UserService();
