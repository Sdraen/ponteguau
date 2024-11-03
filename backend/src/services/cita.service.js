"use strict";

import Cita from "../models/cita.model.js";
import Mascota from "../models/mascota.model.js";
import moment from "moment";
import { obtenerPrecioServicio, calcularPrecioTotal } from "./servicio.service.js";

/**
 * Verifica si existe una cita para una o más mascotas en una fecha específica.
 * @param {Date} fecha - Fecha y hora de la cita.
 * @param {Array} mascotas - Array de IDs de mascotas.
 * @returns {Promise<Boolean>} - `true` si existe una cita en conflicto, `false` en caso contrario.
 */
export async function existeCitaEnFecha(fecha, mascotas) {
  const citas = await Cita.find({ fecha, mascotas: { $in: mascotas } });
  return citas.length > 0;
}

/**
 * Crea una nueva cita en el sistema, incluyendo validaciones y cálculos de precio.
 * @param {Object} citaData - Datos de la cita.
 * @returns {Promise<Object>} - Objeto con la cita creada y el precio total.
 */
export async function crearCita(citaData) {
  const { fecha, servicio, peso, mascotas, extrasSeleccionados = [] } = citaData;

  // Validación: 12 horas de anticipación mínima
  const now = moment();
  const citaFecha = moment(fecha);
  const hoursDifference = citaFecha.diff(now, "hours");

  if (hoursDifference < 12) {
    throw new Error("Las citas deben agendarse con al menos 12 horas de anticipación.");
  }

  // Validación: máximo de 2 mascotas por cita
  if (mascotas.length > 2) {
    throw new Error("No puedes agendar una cita con más de 2 mascotas.");
  }

  // Verificar conflictos de citas
  const conflicto = await existeCitaEnFecha(fecha, mascotas);
  if (conflicto) {
    throw new Error("Ya existe una cita para alguna de las mascotas en la misma fecha y hora.");
  }

  // Calcular precio total del servicio
  const precioTotal = await calcularPrecioTotal(servicio.tipo, peso, extrasSeleccionados);

  // Crear la cita
  const nuevaCita = new Cita({
    ...citaData,
    precioTotal,
    estado: "Pendiente"
  });

  return await nuevaCita.save();
}

/**
 * Obtiene todas las citas del sistema.
 * @returns {Promise<Array>} - Lista de citas.
 */
export async function obtenerCitas() {
  return await Cita.find().populate("mascotas propietario").exec();
}

/**
 * Obtiene una cita por su ID.
 * @param {String} id - ID de la cita.
 * @returns {Promise<Object|null>} - La cita si se encuentra, o `null` si no existe.
 */
export async function obtenerCitaPorId(id) {
  return await Cita.findById(id).populate("mascotas propietario").exec();
}

/**
 * Actualiza una cita por su ID.
 * @param {String} id - ID de la cita.
 * @param {Object} citaData - Datos actualizados de la cita.
 * @returns {Promise<Object|null>} - La cita actualizada si se encuentra, o `null` si no existe.
 */
export async function actualizarCita(id, citaData) {
  const { fecha, mascotas, servicio, peso, extrasSeleccionados = [] } = citaData;

  // Validar si existe un conflicto con otra cita
  const conflicto = await existeCitaEnFecha(fecha, mascotas);
  if (conflicto && conflicto._id.toString() !== id) {
    throw new Error("Ya existe una cita en conflicto para esta mascota en la misma fecha y hora.");
  }

  // Calcular precio total del servicio
  const precioTotal = await calcularPrecioTotal(servicio.tipo, peso, extrasSeleccionados);

  return await Cita.findByIdAndUpdate(id, { ...citaData, precioTotal }, { new: true }).exec();
}

/**
 * Elimina una cita por su ID.
 * @param {String} id - ID de la cita.
 * @returns {Promise<Object|null>} - La cita eliminada si se encuentra, o `null` si no existe.
 */
export async function eliminarCita(id) {
  return await Cita.findByIdAndDelete(id).exec();
}

export default {
  existeCitaEnFecha,
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita
};