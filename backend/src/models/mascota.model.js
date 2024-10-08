"use strict";
import mongoose from "mongoose";

const mascotaSchema = new mongoose.Schema(
    {
    nombre: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    edad: { type: Number, required: true },
    sexo: { type: String, enum: ['Macho', 'Hembra'], required: true },
    raza: { type: String, required: true },
    peso: { type: Number, required: true },
    color: { type: String, required: true },
    chip: { type: Boolean, required: true, default: false },
    esterilizado: { type: Boolean, required: true },
    enfermedades: { type: String, required: true },
    otitis: { type: Boolean, required: true },
    pulgas: { type: Boolean, required: true },
    heridas: { type: Boolean, required: true },
    personalidad: { type: String, required: true },
    fecha_sesiones: { type: Date, required: true },
    recordatorio: { type: String, required: true },
    nota: { type: Number, required: true },
    nodos: { type: Number, required: true },
    permitirFotos: { type: Boolean, required: true },
    imagenPrevia: { type: String, required: false },
    },
);

export default mongoose.model("Mascota", mascotaSchema);
