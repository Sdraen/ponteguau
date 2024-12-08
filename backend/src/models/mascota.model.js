import mongoose from "mongoose";

const mascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha_nacimiento: { type: Date, required: true },
  edad: { type: Number, required: true },
  sexo: { type: String, enum: ['Macho', 'Hembra'], required: true },
  raza: { type: String, required: true },
  peso: { type: Number, required: true },
  chip: { type: Boolean, required: true, default: false },
  esterilizado: { type: Boolean, required: true },
  enfermedades: { type: String, required: true },
  otitis: { type: Boolean, required: true },
  pulgas: { type: Boolean, required: true },
  heridas: { type: Boolean, required: true },
  personalidad: { type: String, required: true },
  recordatorio: { type: String, required: true },
  nota: { type: Number, required: true },
  nodos: { type: Number, required: true },
  imagenAntes: { type: String, required: false }, // Imagen antes de la peluquería
  imagenDespues: { type: String, required: false }, // Imagen después de la peluquería
  propietario: { type: mongoose.Schema.Types.ObjectId, required: false , ref: 'User'},
  notasAdicionales: { type: String, required: false }, // Ahora es un string
});

export default mongoose.model("Mascota", mascotaSchema);
