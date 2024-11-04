"use strict";

import express from "express";
import {
    getMascotas,
    createMascota,
    getMascotaById,
    updateMascota,
    deleteMascota,
    obtenerImagenMascota,
    updateMascotaImagenes,
} from "../controllers/mascota.controller.js";
import upload from "../middlewares/multer.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();
router.use(authenticationMiddleware);

// Rutas de mascotas
router.post("/mascota", upload.fields([{ name: "imagenAntes" }, { name: "imagenDespues" }]), createMascota);
router.put("/mascota/:id", upload.fields([{ name: "imagenAntes" }, { name: "imagenDespues" }]), updateMascota);
router.put("/mascota-imagenes/:id", upload.fields([{ name: "imagenAntes" }, { name: "imagenDespues" }]), updateMascotaImagenes); // Nueva ruta para actualizar solo imágenes
router.delete("/mascota/:id", deleteMascota);
router.get("/mascota/:id", getMascotaById);
router.get("/mascotas", getMascotas);
router.get("/mascota-imagen/:id", obtenerImagenMascota);

export default router;
