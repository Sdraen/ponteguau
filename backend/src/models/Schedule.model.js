import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  dayOfWeek: { type: String, required: true }, // Día de la semana
  startTime: { type: String, required: true, default: '09:00' }, // Hora de inicio
  endTime: { type: String, required: true, default: '18:00' }, // Hora de fin
  maxAppointments: { type: Number, required: true, default: 1 }, // Máximo de citas por día
  appointmentDuration: { type: Number, required: true, default: 60 }, // Duración de cada cita en minutos
  isActive: { type: Boolean, required: true, default: true }, // Si el horario está activo
  createdAt: { type: Date, required: true, default: Date.now }, // Fecha de creación
  updatedAt: { type: Date, required: true, default: Date.now }, // Fecha de última actualización
});

export default mongoose.model("Schedule", scheduleSchema);
