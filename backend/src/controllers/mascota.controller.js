"use strict";

import Mascota from "../models/mascota.model.js";
import { mascotaSchema } from "../schemas/mascota.schema.js";

/**
 * Controlador para gestionar las mascotas.
 */

// Crear una nueva mascota
export const crearMascota = async (req, res) => {
  try {
    // Validar el cuerpo de la solicitud
    const { error } = mascotaSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: error.details[0].message });
    }

    // Manejar la imagen si se proporciona
    const imagen = req.file ? req.file.path : null;

    // Crear una nueva mascota en la base de datos
    const nuevaMascota = new Mascota({ ...req.body, imagenPrevia: imagen });
    const mascotaGuardada = await nuevaMascota.save();

    res.status(201).json(mascotaGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la mascota", error: error.message });
  }
};

// Obtener todas las mascotas
export const obtenerMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find();
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las mascotas", error: error.message });
  }
};

// Obtener una mascota por ID
export const obtenerMascotaPorId = async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (!mascota) {
      return res.status(404).json({ mensaje: "Mascota no encontrada" });
    }
    res.status(200).json(mascota);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la mascota", error: error.message });
  }
};

// Actualizar una mascota por ID
export const actualizarMascota = async (req, res) => {
  try {
    // Validar el cuerpo de la solicitud
    const { error } = mascotaSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensaje: error.details[0].message });
    }

    // Manejar la imagen si se proporciona
    const imagen = req.file ? req.file.path : null;

    const mascotaActualizada = await Mascota.findByIdAndUpdate(req.params.id, { ...req.body, ...(imagen && { imagenPrevia: imagen }) }, { new: true });
    if (!mascotaActualizada) {
      return res.status(404).json({ mensaje: "Mascota no encontrada" });
    }
    res.status(200).json(mascotaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la mascota", error: error.message });
  }
};

// Eliminar una mascota por ID
export const eliminarMascota = async (req, res) => {
  try {
    const mascotaEliminada = await Mascota.findByIdAndDelete(req.params.id);
    if (!mascotaEliminada) {
      return res.status(404).json({ mensaje: "Mascota no encontrada" });
    }
    res.status(200).json({ mensaje: "Mascota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la mascota", error: error.message });
  }
};

export default {
  crearMascota,
  obtenerMascotas,
  obtenerMascotaPorId,
  actualizarMascota,
  eliminarMascota
};