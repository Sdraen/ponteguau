"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import MascotaService from "../services/mascota.service.js";
import { mascotaSchema, mascotaIdSchema } from "../schemas/mascota.schema.js";
import { handleError } from "../utils/errorHandler.js";
import path from "path";
import fs from "fs";

/**
 * Obtiene todas las mascotas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getMascotas(req, res) {
  try {
    const [mascotas, errorMascotas] = await MascotaService.obtenerMascotas();
    if (errorMascotas) return respondError(req, res, 500, errorMascotas);

    mascotas.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, mascotas);
  } catch (error) {
    handleError(error, "mascota.controller -> getMascotas");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea una nueva mascota
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createMascota(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = mascotaSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const imagen = req.file ? req.file.path : null;

    const [nuevaMascota, errorMascota] = await MascotaService.crearMascota({
      ...body,
      imagenPrevia: imagen,
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
 * Obtiene una mascota por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getMascotaById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [mascota, errorMascota] = await MascotaService.obtenerMascotaPorId(params.id);

    if (errorMascota) return respondError(req, res, 404, errorMascota);

    respondSuccess(req, res, 200, mascota);
  } catch (error) {
    handleError(error, "mascota.controller -> getMascotaById");
    respondError(req, res, 500, "No se pudo obtener la mascota");
  }
}

/**
 * Actualiza una mascota por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateMascota(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = mascotaSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const imagen = req.file ? req.file.path : null;

    const [mascota, errorMascota] = await MascotaService.actualizarMascota(
      params.id,
      { ...body, ...(imagen && { imagenPrevia: imagen }) }
    );

    if (errorMascota) return respondError(req, res, 400, errorMascota);

    respondSuccess(req, res, 200, mascota);
  } catch (error) {
    handleError(error, "mascota.controller -> updateMascota");
    respondError(req, res, 500, "No se pudo actualizar la mascota");
  }
}

/**
 * Elimina una mascota por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteMascota(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [, errorMascota] = await MascotaService.eliminarMascota(params.id);
    if (errorMascota) {
      return respondError(req, res, 404, errorMascota);
    }

    respondSuccess(req, res, 200, { mensaje: "Mascota eliminada correctamente" });
  } catch (error) {
    handleError(error, "mascota.controller -> deleteMascota");
    respondError(req, res, 500, "No se pudo eliminar la mascota");
  }
}

/**
 * Obtiene la imagen de una mascota por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function obtenerImagenMascota(req, res) {
  try {
    const { id } = req.params;

    const [mascota, errorMascota] = await MascotaService.obtenerMascotaPorId(id);
    if (errorMascota || !mascota.imagenPrevia) {
      return respondError(req, res, 404, "Imagen no encontrada");
    }

    const imagePath = path.resolve(mascota.imagenPrevia);
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      respondError(req, res, 404, "Imagen no encontrada en el servidor");
    }
  } catch (error) {
    handleError(error, "mascota.controller -> obtenerImagenMascota");
    respondError(req, res, 500, "No se pudo obtener la imagen de la mascota");
  }
}

export default {
  getMascotas,
  createMascota,
  getMascotaById,
  updateMascota,
  deleteMascota,
  obtenerImagenMascota,
};
