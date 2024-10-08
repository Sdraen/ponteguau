import Mascota from '../models/mascota.model.js';

// Obtener todas las mascotas
exports.getAllMascotas = async (req, res) => {
    try {
        const mascotas = await Mascota.find();
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una mascota por ID
exports.getMascotaById = async (req, res) => {
    try {
        const mascota = await Mascota.findById(req.params.id);
        if (!mascota) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.status(200).json(mascota);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva mascota
exports.createMascota = async (req, res) => {
    const { nombre, edad, tipo } = req.body;
    const nuevaMascota = new Mascota({ nombre, edad, tipo });

    try {
        const mascotaGuardada = await nuevaMascota.save();
        res.status(201).json(mascotaGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una mascota existente
exports.updateMascota = async (req, res) => {
    try {
        const mascotaActualizada = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!mascotaActualizada) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.status(200).json(mascotaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una mascota
exports.deleteMascota = async (req, res) => {
    try {
        const mascotaEliminada = await Mascota.findByIdAndDelete(req.params.id);
        if (!mascotaEliminada) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.status(200).json({ message: 'Mascota eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};