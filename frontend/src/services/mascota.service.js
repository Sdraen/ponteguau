// src/services/mascota.service.js
import axios from './root.service';

// Obtener todas las mascotas
export const getMascotas = async () => {
  const { data } = await axios.get('/mascotas');
  return data.data;
};

// Obtener una mascota por ID
export const getMascotaById = async (id) => {
  const { data } = await axios.get(`/mascota/${id}`);
  return data.data;
};

// Crear una nueva mascota con imágenes (imagenAntes e imagenDespues)
export const createMascota = async (mascotaData) => {
  const { data } = await axios.post('/mascota', mascotaData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};

// Actualizar toda la información de una mascota (incluyendo imágenes)
export const updateMascota = async (id, mascotaData) => {
  const { data } = await axios.put(`/mascota/${id}`, mascotaData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};

// Actualizar solo las imágenes de una mascota
export const updateMascotaImagenes = async (id, imagenData) => {
  const { data } = await axios.put(`/mascota-imagenes/${id}`, imagenData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};

// Eliminar una mascota por ID
export const deleteMascota = async (id) => {
  const { data } = await axios.delete(`/mascota/${id}`);
  return data.data;
};

// Obtener la imagen de una mascota por ID
export const obtenerImagenMascota = async (id) => {
  const { data } = await axios.get(`/mascota-imagen/${id}`, { responseType: 'blob' });
  return data;
};
