import express from "express";
import {
  getCitas,
  createCita,
  getCitaById,
  updateCita,
  deleteCita
} from "../controllers/cita.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();

// Aplica el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas de Citas

router.get("/", getCitas);

router.post("/", createCita);

router.get("/:id",  getCitaById);

router.put("/:id", updateCita);

router.delete("/:id", deleteCita);

export default router;
