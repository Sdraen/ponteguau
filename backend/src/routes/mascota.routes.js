// routes/mascota.routes.js
import express from 'express';
import {
    crearMascota,
    obtenerMascotas,
    obtenerMascotaPorId,
    actualizarMascota,
    eliminarMascota
} from '../controllers/mascota.controller.js';

const router = express.Router();

router.post('/mascotas', crearMascota); // Crear una nueva mascota
router.get('/mascotas', obtenerMascotas); // Obtener todas las mascotas
router.get('/mascotas/:id', obtenerMascotaPorId); // Obtener una mascota por ID
router.put('/mascotas/:id', actualizarMascota); // Actualizar una mascota por ID
router.delete('/mascotas/:id', eliminarMascota); // Eliminar una mascota por ID

export default router;
