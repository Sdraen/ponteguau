import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  fecha: { type: Date, required: true }, // Fecha y hora de la cita
  mascota: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true }, // Referencia a la mascota
  propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al propietario de la mascota
  servicio: { type: String, required: true }, // Tipo de servicio solicitado
  estado: {
    type: String,
    enum: ['Pendiente', 'Confirmada', 'Completada', 'Cancelada'],
    default: 'Pendiente'
  },
  notas: { type: String, required: false }, // Notas adicionales sobre la cita
  imagenAntes: { type: String, required: false }, // Imagen antes del servicio
  imagenDespues: { type: String, required: false }, // Imagen después del servicio
  creadoEn: { type: Date, default: Date.now }, // Fecha de creación de la cita
  actualizadoEn: { type: Date, default: Date.now } // Fecha de última actualización
});

// Middleware para actualizar la fecha de `actualizadoEn` automáticamente al modificar
citaSchema.pre("findOneAndUpdate", function(next) {
  this.set({ actualizadoEn: Date.now() });
  next();
});

export default mongoose.model("Cita", citaSchema);
