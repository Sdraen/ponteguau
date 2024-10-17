"use strict";

import Mascota from "../models/mascota.model.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Crea una nueva mascota
 * @param {Object} mascotaData - Datos de la mascota
 * @returns {Promise} Promesa con el objeto de la mascota creada
 */
export async function crearMascota(mascotaData) {
  try {
    const nuevaMascota = new Mascota(mascotaData);
    const mascotaGuardada = await nuevaMascota.save();
    return [mascotaGuardada, null];
  } catch (error) {
    handleError(error, "mascota.service -> crearMascota");
    return [null, "Error al crear la mascota"];
  }
}

/**
 * Obtiene todas las mascotas
 * @returns {Promise} Promesa con el objeto de todas las mascotas
 */
export async function obtenerMascotas() {
  try {
    const mascotas = await Mascota.find().populate('propietario').exec();
    return [mascotas, null];
  } catch (error) {
    handleError(error, "mascota.service -> obtenerMascotas");
    return [null, "Error al obtener las mascotas"];
  }
}

/**
 * Obtiene una mascota por su ID
 * @param {String} id - ID de la mascota
 * @returns {Promise} Promesa con el objeto de la mascota
 */
export async function obtenerMascotaPorId(id) {
  try {
    const mascota = await Mascota.findById(id).populate('propietario').exec();
    if (!mascota) return [null, "Mascota no encontrada"];
    return [mascota, null];
  } catch (error) {
    handleError(error, "mascota.service -> obtenerMascotaPorId");
    return [null, "Error al obtener la mascota"];
  }
}

/**
 * Actualiza una mascota por su ID
 * @param {String} id - ID de la mascota
 * @param {Object} mascotaData - Datos actualizados de la mascota
 * @returns {Promise} Promesa con el objeto de la mascota actualizada
 */
export async function actualizarMascota(id, mascotaData) {
  try {
    const mascotaActualizada = await Mascota.findByIdAndUpdate(id, mascotaData, { new: true });
    if (!mascotaActualizada) return [null, "Mascota no encontrada"];
    return [mascotaActualizada, null];
  } catch (error) {
    handleError(error, "mascota.service -> actualizarMascota");
    return [null, "Error al actualizar la mascota"];
  }
}

/**
 * Elimina una mascota por su ID
 * @param {String} id - ID de la mascota
 * @returns {Promise} Promesa con el objeto de la mascota eliminada
 */
export async function eliminarMascota(id) {
  try {
    const mascotaEliminada = await Mascota.findByIdAndDelete(id);
    if (!mascotaEliminada) return [null, "Mascota no encontrada"];
    return [mascotaEliminada, null];
  } catch (error) {
    handleError(error, "mascota.service -> eliminarMascota");
    return [null, "Error al eliminar la mascota"];
  }
}

export default {
  crearMascota,
  obtenerMascotas,
  obtenerMascotaPorId,
  actualizarMascota,
  eliminarMascota,
};
