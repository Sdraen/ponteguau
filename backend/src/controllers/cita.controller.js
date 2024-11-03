"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import CitaService from "../services/cita.service.js";
import { handleError } from "../utils/errorHandler.js";
import Mascota from "../models/mascota.model.js";
import resend from "../utils/resend.js";
import moment from "moment";

/**
 * Crea una nueva cita y envía un correo de confirmación.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
 */
export async function createCita(req, res) {
  try {
    const { fecha, servicio, mascotas, propietario, email } = req.body;

    // Validación de cita existente
    const existingCita = await CitaService.existeCitaEnFecha(fecha, mascotas);
    if (existingCita) {
      return respondError(req, res, 400, "Ya existe una cita para esta mascota en la misma fecha y hora.");
    }

    // Validación de anticipación de 12 horas
    const now = moment();
    const citaFecha = moment(fecha);
    const hoursDifference = citaFecha.diff(now, "hours");

    if (hoursDifference < 12) {
      return respondError(req, res, 400, "Las citas deben agendarse con un máximo de 12 horas de anticipación.");
    }

    // Crear la cita
    const nuevaCita = await CitaService.crearCita(req.body);

    // Obtener detalles de las mascotas
    const mascotasDetalle = await Mascota.find({ _id: { $in: mascotas } });
    const nombresMascotas = mascotasDetalle.map(mascota => mascota.nombre).join(", ");

    // Contenido del correo de confirmación
    const emailContent = {
      from: "no-reply@ponteguau.com", // Verifica que el dominio esté autorizado en Resend
      to: email,
      subject: "Confirmación de cita en Ponteguau",
      html: `
        <strong>Su cita ha sido confirmada.</strong><br>
        Fecha: ${moment(fecha).format("DD/MM/YYYY HH:mm")}<br>
        Mascotas: ${nombresMascotas}<br>
        Servicio: ${servicio}
      `,
    };

    // Enviar correo de confirmación
    const { data, error } = await resend.emails.send(emailContent);

    if (error) {
      return respondError(req, res, 500, "No se pudo enviar el correo de confirmación.");
    }

    respondSuccess(req, res, 201, nuevaCita);
  } catch (error) {
    handleError(error, "cita.controller -> createCita");
    respondError(req, res, 500, "No se pudo crear la cita");
  }
}

/**
 * Actualiza una cita y envía un correo de notificación.
 * @param {import('express').Request} req - La solicitud HTTP.
 * @param {import('express').Response} res - La respuesta HTTP.
 */
export async function updateCita(req, res) {
  try {
    const { id } = req.params;
    const { fecha, mascotas, email } = req.body;

    // Validación de cita existente
    const existingCita = await CitaService.existeCitaEnFecha(fecha, mascotas);
    if (existingCita && existingCita._id.toString() !== id) {
      return respondError(req, res, 400, "Ya existe una cita para esta mascota en la misma fecha y hora.");
    }

    const updatedCita = await CitaService.actualizarCita(id, req.body);

    if (!updatedCita) {
      return respondError(req, res, 404, "No se encontró la cita solicitada");
    }

    // Obtener detalles de las mascotas
    const mascotasDetalle = await Mascota.find({ _id: { $in: mascotas } });
    const nombresMascotas = mascotasDetalle.map(mascota => mascota.nombre).join(", ");

    // Contenido del correo de actualización
    const emailContent = {
      from: "no-reply@ponteguau.com", // Verifica que el dominio esté autorizado en Resend
      to: email,
      subject: "Actualización de cita en Ponteguau",
      html: `
        <strong>Su cita ha sido actualizada.</strong><br>
        Nueva Fecha: ${moment(fecha).format("DD/MM/YYYY HH:mm")}<br>
        Mascotas: ${nombresMascotas}<br>
      `,
    };

    // Enviar correo de actualización
    const { data, error } = await resend.emails.send(emailContent);

    if (error) {
      return respondError(req, res, 500, "No se pudo enviar el correo de actualización.");
    }

    respondSuccess(req, res, 200, updatedCita);
  } catch (error) {
    handleError(error, "cita.controller -> updateCita");
    respondError(req, res, 500, "No se pudo actualizar la cita");
  }
}

export default {
  getCitas,
  createCita,
  getCitaById,
  updateCita,
  deleteCita,
};
