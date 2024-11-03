"use strict";

import express from "express";
import {
    getMascotas,
    createMascota,
    getMascotaById,
    updateMascota,
    deleteMascota,
    obtenerImagenMascota,
    updateMascotaImagenes, // Nueva función para actualizar solo imágenes
} from "../controllers/mascota.controller.js";
import upload from "../middlewares/multer.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();
router.use(authenticationMiddleware);

// Rutas de mascotas
router.post("/crear", upload.fields([{ name: "imagenAntes" }, { name: "imagenDespues" }]), createMascota);
router.put("/actualizar/:id", upload.fields([{ name: "imagenAntes" }, { name: "imagenDespues" }]), updateMascota);
router.put("/actualizar-imagenes/:id", upload.fields([{ name: "imagenAntes" }, { name: "imagenDespues" }]), updateMascotaImagenes); // Nueva ruta para actualizar solo imágenes
router.delete("/eliminar/:id", deleteMascota);
router.get("/obtener/:id", getMascotaById);
router.get("/todos", getMascotas);
router.get("/imagen/:id", obtenerImagenMascota);

export default router;