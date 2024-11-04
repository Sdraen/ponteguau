"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import MascotaService from "../services/mascota.service.js";
import { mascotaSchema, mascotaIdSchema } from "../schema/mascota.schema.js";
import { handleError } from "../utils/errorHandler.js";
import path from "path";
import fs from "fs";

/**
 * Crea una nueva mascota con imágenes opcionales antes y después de la peluquería.
 */
export async function createMascota(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = mascotaSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const imagenAntes = req.files?.imagenAntes?.[0]?.path || null;
    const imagenDespues = req.files?.imagenDespues?.[0]?.path || null;

    const [nuevaMascota, errorMascota] = await MascotaService.createMascota({
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
export async function updateMascota(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = mascotaSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const imagenAntes = req.files?.imagenAntes?.[0]?.path || null;
    const imagenDespues = req.files?.imagenDespues?.[0]?.path || null;

    const [mascota, errorMascota] = await MascotaService.updateMascota(
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
export async function deleteMascota(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [mascota, errorMascota] = await MascotaService.deleteMascota(params.id);
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
export async function updateMascotaImagenes(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const imagenAntes = req.files?.imagenAntes?.[0]?.path || null;
    const imagenDespues = req.files?.imagenDespues?.[0]?.path || null;

    const [mascota, errorMascota] = await MascotaService.updateMascota(
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

export async function getMascotaById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [mascota, errorMascota] = await MascotaService.getMascotaById(params.id);
    if (errorMascota) return respondError(req, res, 404, errorMascota);

    respondSuccess(req, res, 200, mascota);
  } catch (error) {
    handleError(error, "mascota.controller -> getMascotaById");
    respondError(req, res, 500, "No se pudo obtener la mascota");
  }
}

export async function getMascotas(req, res) {
  try {
    const [mascotas, errorMascotas] = await MascotaService.getMascotas();
    if (errorMascotas) return respondError(req, res, 500, errorMascotas);

    respondSuccess(req, res, 200, mascotas);
  } catch (error) {
    handleError(error, "mascota.controller -> getMascotas");
    respondError(req, res, 500, "No se pudieron obtener las mascotas");
  }
}

export async function obtenerImagenMascota(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = mascotaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [mascota, errorMascota] = await MascotaService.getMascotaById(params.id);
    if (errorMascota) return respondError(req, res, 404, errorMascota);

    const imagen = mascota.imagenAntes || mascota.imagenDespues;
    if (!imagen) return respondError(req, res, 404, "No se encontró la imagen");

    res.sendFile(path.resolve(imagen));
  } catch (error) {
    handleError(error, "mascota.controller -> obtenerImagenMascota");
    respondError(req, res, 500, "No se pudo obtener la imagen de la mascota");
  }
}