"use strict";

import Mascota from "../models/Mascota.model.js";
import { handleError } from "../utils/errorHandler.js";
import fs from "fs";
import path from "path";

/**
 * Crea una nueva mascota
 * @param {Object} mascotaData - Datos de la mascota
 * @returns {Promise} Promesa con el objeto de la mascota creada
 */
export async function createMascota(mascotaData) {
  try {
    const nuevaMascota = new Mascota(mascotaData);
    const mascotaGuardada = await nuevaMascota.save();
    return [mascotaGuardada, null];
  } catch (error) {
    handleError(error, "mascota.service -> createMascota");
    return [null, "Error al crear la mascota"];
  }
}

/**
 * Obtiene todas las mascotas
 * @returns {Promise} Promesa con el objeto de todas las mascotas
 */
export async function getMascotas() {
  try {
    const mascotas = await Mascota.find().populate('propietario').exec();
    return [mascotas, null];
  } catch (error) {
    handleError(error, "mascota.service -> getMascotas");
    return [null, "Error al obtener las mascotas"];
  }
}

/**
 * Obtiene una mascota por su ID
 * @param {String} id - ID de la mascota
 * @returns {Promise} Promesa con el objeto de la mascota
 */
export async function getMascotaById(id) {
  try {
    const mascota = await Mascota.findById(id).populate('propietario').exec();
    if (!mascota) return [null, "Mascota no encontrada"];
    return [mascota, null];
  } catch (error) {
    handleError(error, "mascota.service -> getMascotaById");
    return [null, "Error al obtener la mascota"];
  }
}

/**
 * Actualiza una mascota por su ID, incluyendo gestión de imágenes
 * @param {String} id - ID de la mascota
 * @param {Object} mascotaData - Datos actualizados de la mascota
 * @returns {Promise} Promesa con el objeto de la mascota actualizada
 */
export async function updateMascota(id, mascotaData) {
  try {
    const mascotaActual = await Mascota.findById(id);

    if (!mascotaActual) return [null, "Mascota no encontrada"];

    // Elimina la imagen anterior si hay una nueva proporcionada
    if (mascotaData.imagenAntes && mascotaActual.imagenAntes) {
      fs.unlinkSync(path.resolve(mascotaActual.imagenAntes));
    }
    if (mascotaData.imagenDespues && mascotaActual.imagenDespues) {
      fs.unlinkSync(path.resolve(mascotaActual.imagenDespues));
    }

    const mascotaActualizada = await Mascota.findByIdAndUpdate(id, mascotaData, { new: true });
    return [mascotaActualizada, null];
  } catch (error) {
    handleError(error, "mascota.service -> updateMascota");
    return [null, "Error al actualizar la mascota"];
  }
}

/**
 * Elimina una mascota por su ID y sus imágenes asociadas
 * @param {String} id - ID de la mascota
 * @returns {Promise} Promesa con el objeto de la mascota eliminada
 */
export async function deleteMascota(id) {
  try {
    const mascotaEliminada = await Mascota.findByIdAndDelete(id);

    if (!mascotaEliminada) return [null, "Mascota no encontrada"];

    // Elimina las imágenes asociadas
    if (mascotaEliminada.imagenAntes) fs.unlinkSync(path.resolve(mascotaEliminada.imagenAntes));
    if (mascotaEliminada.imagenDespues) fs.unlinkSync(path.resolve(mascotaEliminada.imagenDespues));

    return [mascotaEliminada, null];
  } catch (error) {
    handleError(error, "mascota.service -> deleteMascota");
    return [null, "Error al eliminar la mascota"];
  }
}

export default {
  createMascota,
  getMascotas,
  getMascotaById,
  updateMascota,
  deleteMascota,
};
