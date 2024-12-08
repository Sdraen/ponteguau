import axios from "./root.service";

// Obtener todos los usuarios
export const getUsers = async () => {
  const { data } = await axios.get("/users");
  return data.data; // Ajustar según la estructura de respuesta del backend
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  const { data } = await axios.get(`/users/${id}`);
  return data.data;
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  const { data } = await axios.post("/users", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
  const { data } = await axios.put(`/users/${id}`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
};

// Eliminar un usuario por ID
export const deleteUser = async (id) => {
  const { data } = await axios.delete(`/users/${id}`);
  return data.data;
};