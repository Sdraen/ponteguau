"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import MascotaService from "../services/mascota.service.js";
import { mascotaSchema, mascotaIdSchema } from "../schemas/mascota.schema.js";
import { handleError } from "../utils/errorHandler.js";
import path from "path";
import fs from "fs";

/**
 * Crea una nueva mascota con imágenes opcionales antes y después de la peluquería.
 */
async function createMascota(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = mascotaSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const imagenAntes = req.files?.imagenAntes?.[0]?.path || null;
    const imagenDespues = req.files?.imagenDespues?.[0]?.path || null;

    const [nuevaMascota, errorMascota] = await MascotaService.crearMascota({
      ...body,
      imagenAntes,
      imagenDespues,
    });

    if (errorMascota) return respondError(req, res, 500, errorMascota);
    if (!nuevaMascota) {
      return respondError(req, res, 400, "No se pudo crear la mascota");
    }

    respondSuccess(req, res, 201, nuevaMascota);
  } catch (error) {
    handleError(error, "mascota.controller -> createMascota");
    respondError(req, res, 500, "No se pudo crear la mascota");
  }
}

/**
 * Actualiza una mascota por su ID, incluyendo las imágenes antes y después.
 */
async function updateMascota(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = mascotaSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const imagenAntes = req.files?.imagenAntes?.[0]?.path || null;
    const imagenDespues = req.files?.imagenDespues?.[0]?.path || null;

    const [mascota, errorMascota] = await MascotaService.actualizarMascota(
      params.id,
      {
        ...body,
        ...(imagenAntes && { imagenAntes }),
        ...(imagenDespues && { imagenDespues }),
      }
    );

    if (errorMascota) return respondError(req, res, 400, errorMascota);

    respondSuccess(req, res, 200, mascota);
  } catch (error) {
    handleError(error, "mascota.controller -> updateMascota");
    respondError(req, res, 500, "No se pudo actualizar la mascota");
  }
}

/**
 * Elimina una mascota y sus imágenes por su ID.
 */
async function deleteMascota(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [mascota, errorMascota] = await MascotaService.eliminarMascota(params.id);
    if (errorMascota) return respondError(req, res, 404, errorMascota);

    // Elimina las imágenes asociadas
    if (mascota.imagenAntes) fs.unlinkSync(path.resolve(mascota.imagenAntes));
    if (mascota.imagenDespues) fs.unlinkSync(path.resolve(mascota.imagenDespues));

    respondSuccess(req, res, 200, { mensaje: "Mascota eliminada correctamente" });
  } catch (error) {
    handleError(error, "mascota.controller -> deleteMascota");
    respondError(req, res, 500, "No se pudo eliminar la mascota");
  }
}

/**
 * Actualiza solo las imágenes de una mascota
 */
async function updateMascotaImagenes(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const imagenAntes = req.files?.imagenAntes?.[0]?.path || null;
    const imagenDespues = req.files?.imagenDespues?.[0]?.path || null;

    const [mascota, errorMascota] = await MascotaService.actualizarMascota(
      params.id,
      {
        ...(imagenAntes && { imagenAntes }),
        ...(imagenDespues && { imagenDespues }),
      }
    );

    if (errorMascota) return respondError(req, res, 400, errorMascota);

    respondSuccess(req, res, 200, { mensaje: "Imágenes actualizadas correctamente", mascota });
  } catch (error) {
    handleError(error, "mascota.controller -> updateMascotaImagenes");
    respondError(req, res, 500, "No se pudieron actualizar las imágenes de la mascota");
  }
}

export default {
  getMascotas,
  createMascota,
  getMascotaById,
  updateMascota,
  deleteMascota,
  obtenerImagenMascota,
  updateMascotaImagenes, // Nuevo endpoint
};
