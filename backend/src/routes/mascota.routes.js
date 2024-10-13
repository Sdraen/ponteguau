"use strict";

import express from "express";
import {
    crearMascota,
    obtenerMascotaPorId,
    obtenerMascotas,
    actualizarMascota,
    eliminarMascota,
    obtenerImagenMascota
} from "../controllers/mascota.controller.js";
import upload from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = express.Router();

// Rutas accesibles solo por administradores
router.post("/crear", upload.single("imagen"), isAdmin, crearMascota);
router.put("/actualizar/:id", isAdmin, upload.single("imagen"), actualizarMascota);
router.delete("/eliminar/:id", isAdmin, eliminarMascota);

// Rutas accesibles por todos los usuarios autenticados
router.get("/obtener/:id", obtenerMascotaPorId);
router.get("/todos", obtenerMascotas);

// Petición GET para obtener la imagen de una mascota por ID
router.get("/imagen/:id", obtenerImagenMascota);


export default router;