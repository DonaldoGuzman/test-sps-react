import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";


function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
   const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await UserService.list();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await UserService.update(editingUser.email, {
        name: editingUser.name,
        password: editingUser.password,
        type: editingUser.type,
      });
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error("Error al actualizar usuario", error);
      alert("Error al actualizar usuario");
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm("¿Seguro que querés eliminar este usuario?")) return;
    try {
      await UserService.delete(email);
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario", error);
      alert("Error al eliminar usuario");
    }
  };

  const handleChangeEditing = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/add-user")}
      >
        + Agregar Usuario
      </button>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Contraseña</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.password}</td>
              <td>{u.type}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Editar</button>{" "}
                <button onClick={() => handleDelete(u.email)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <form onSubmit={handleUpdate} style={{ marginTop: 20 }}>
          <h3>Editar Usuario</h3>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={editingUser.name}
              onChange={handleChangeEditing}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="text"
              name="password"
              value={editingUser.password}
              onChange={handleChangeEditing}
              required
            />
          </div>
          <div>
            <label>Tipo:</label>
            <select
              name="type"
              value={editingUser.type}
              onChange={handleChangeEditing}
              required
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button type="submit">Guardar cambios</button>{" "}
          <button type="button" onClick={() => setEditingUser(null)}>
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}

export default Users;
