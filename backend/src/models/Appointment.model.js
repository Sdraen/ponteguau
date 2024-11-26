import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Usuario que agenda la cita
  petId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Mascota' }, // Mascota asociada a la cita
  serviceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Service' }, // Servicio agendado
  date: { type: Date, required: true, default: Date.now }, // Fecha de la cita
  startTime: { type: String, required: true }, // Hora de inicio
  endTime: { type: String, required: true }, // Hora de fin
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    required: true, 
    default: 'pending' 
  }, // Estado de la cita
  notes: { type: String, required: false }, // Notas adicionales
  createdAt: { type: Date, required: true, default: Date.now }, // Fecha de creación
  updatedAt: { type: Date, required: true, default: Date.now }, // Fecha de última actualización
});

export default mongoose.model("Appointment", appointmentSchema);
