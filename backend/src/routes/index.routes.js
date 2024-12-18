"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Enrutador de mascotas */
import mascotaRoutes from "./mascota.routes.js";

/** Enrutador de citas */
import appointmentRoutes from "./appointment.routes.js";

/** Instancia del enrutador */
const router = Router();
// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para las mascotas
router.use("/", mascotaRoutes);
router.use("/api/appointments", appointmentRoutes);
// Exporta el enrutador
export default router;
