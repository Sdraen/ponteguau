"use strict";

import Cita from "../models/Cita.model.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Obtiene todas las citas.
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
export async function getCitas(req, res) {
  try {
    const citas = await Cita.find()
      .populate("mascota", "nombre")
      .populate("propietario", "nombre email")
      .exec();
    respondSuccess(req, res, 200, citas);
  } catch (error) {
    handleError(error, "cita.controller -> getCitas");
    respondError(req, res, 500, "No se pudo obtener las citas");
  }
}

/**
 * Crea una nueva cita.
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
export async function createCita(req, res) {
  try {
    const { fecha, mascota, propietario, servicio, notas } = req.body;

    // Crear nueva cita
    const nuevaCita = new Cita({
      fecha,
      mascota,
      propietario,
      servicio,
      notas,
    });

    const citaGuardada = await nuevaCita.save();
    respondSuccess(req, res, 201, citaGuardada);
  } catch (error) {
    handleError(error, "cita.controller -> createCita");
    respondError(req, res, 500, "No se pudo crear la cita");
  }
}

/**
 * Obtiene una cita por su ID.
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
export async function getCitaById(req, res) {
  try {
    const { id } = req.params;
    const cita = await Cita.findById(id)
      .populate("mascota", "nombre")
      .populate("propietario", "nombre email")
      .exec();

    if (!cita) {
      return respondError(req, res, 404, "No se encontró la cita solicitada");
    }

    respondSuccess(req, res, 200, cita);
  } catch (error) {
    handleError(error, "cita.controller -> getCitaById");
    respondError(req, res, 500, "No se pudo obtener la cita");
  }
}

/**
 * Actualiza una cita por su ID.
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
export async function updateCita(req, res) {
  try {
    const { id } = req.params;
    const { fecha, servicio, notas, estado, imagenAntes, imagenDespues } = req.body;

    const citaActualizada = await Cita.findByIdAndUpdate(
      id,
      { fecha, servicio, notas, estado, imagenAntes, imagenDespues },
      { new: true }
    );

    if (!citaActualizada) {
      return respondError(req, res, 404, "No se encontró la cita solicitada");
    }

    respondSuccess(req, res, 200, citaActualizada);
  } catch (error) {
    handleError(error, "cita.controller -> updateCita");
    respondError(req, res, 500, "No se pudo actualizar la cita");
  }
}

/**
 * Elimina una cita por su ID.
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
export async function deleteCita(req, res) {
  try {
    const { id } = req.params;

    const citaEliminada = await Cita.findByIdAndDelete(id);

    if (!citaEliminada) {
      return respondError(req, res, 404, "No se encontró la cita solicitada");
    }

    respondSuccess(req, res, 200, { mensaje: "Cita eliminada correctamente" });
  } catch (error) {
    handleError(error, "cita.controller -> deleteCita");
    respondError(req, res, 500, "No se pudo eliminar la cita");
  }
}

export default {
  getCitas,
  createCita,
  getCitaById,
  updateCita,
  deleteCita,
};