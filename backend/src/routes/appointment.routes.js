import express from 'express';
import * as appointmentController from '../controllers/appointment.controller.js';

const router = express.Router();

/**
 * Rutas para la gestión de citas
 */

// Crear una nueva cita
router.post('/', appointmentController.createAppointment);

// Obtener todas las citas de un usuario
router.get('/', appointmentController.getUserAppointments);

// Obtener una cita específica por ID
router.get('/:id', appointmentController.getAppointment);

// Actualizar una cita por ID
router.put('/:id', appointmentController.updateAppointment);

// Eliminar una cita por ID
router.delete('/:id', appointmentController.deleteAppointment);

export default router;