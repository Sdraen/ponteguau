"use strict";

import express from "express";
import {
    getMascotas,
    createMascota,
    getMascotaById,
    updateMascota,
    deleteMascota,
    obtenerImagenMascota,
} from "../controllers/mascota.controller.js";
import upload from "../middlewares/multer.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();
router.use(authenticationMiddleware);

// Rutas de mascotas
router.post("/crear", upload.single("imagen"), createMascota);
router.put("/actualizar/:id", upload.single("imagen"), updateMascota);
router.delete("/eliminar/:id",  deleteMascota);
router.get("/obtener/:id", getMascotaById);
router.get("/todos", getMascotas);
router.get("/imagen/:id", obtenerImagenMascota);


export default router;