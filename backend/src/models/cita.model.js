import mongoose from "mongoose";

const CitaSchema = new mongoose.Schema({
  fecha: { type: Date, required: true }, // Fecha de la cita
  mascota: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true }, // Referencia a la mascota
  propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al propietario de la mascota
  servicio: {
    type: String,
    enum: ['Peluquería', 'Retoque', 'Baño', 'Deslanado'],
    required: true
  }, // Tipo de servicio
  estado: {
    type: String,
    enum: ['Pendiente', 'Confirmada', 'Completada', 'Cancelada'],
    default: 'Pendiente'
  }, // Estado de la cita
  notas: { type: String, required: false }, // Notas adicionales
  imagenAntes: { type: String, required: false }, // Imagen antes del servicio
  imagenDespues: { type: String, required: false }, // Imagen después del servicio
  creadoEn: { type: Date, default: Date.now }, // Fecha de creación
  actualizadoEn: { type: Date, default: Date.now } // Fecha de última actualización
});

// Middleware para actualizar la fecha de `actualizadoEn` automáticamente al modificar
CitaSchema.pre("findOneAndUpdate", function (next) {
  this.set({ actualizadoEn: Date.now() });
  next();
});

export default mongoose.model("Cita", CitaSchema);
