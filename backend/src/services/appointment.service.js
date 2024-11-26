import Appointment from '../models/Appointment.js';

/**
 * Crea una nueva cita.
 * @param {Object} appointmentData - Datos de la cita.
 * @returns {Object} - Cita creada.
 */
export const createAppointment = async (appointmentData) => {
  try {
    const appointment = new Appointment(appointmentData);
    return await appointment.save();
  } catch (error) {
    throw new Error(`Error al crear la cita: ${error.message}`);
  }
};

/**
 * Obtiene todas las citas con relaciones pobladas.
 * @returns {Array} - Lista de citas.
 */
export const getAllAppointments = async () => {
  try {
    return await Appointment.find()
      .populate('userId', 'name email')
      .populate('petId', 'nombre raza')
      .populate('serviceId', 'name price');
  } catch (error) {
    throw new Error(`Error al obtener las citas: ${error.message}`);
  }
};

/**
 * Obtiene una cita por ID.
 * @param {String} id - ID de la cita.
 * @returns {Object} - Cita encontrada.
 */
export const getAppointmentById = async (id) => {
  try {
    const appointment = await Appointment.findById(id)
      .populate('userId', 'name email')
      .populate('petId', 'nombre raza')
      .populate('serviceId', 'name price');
    if (!appointment) throw new Error('Cita no encontrada');
    return appointment;
  } catch (error) {
    throw new Error(`Error al obtener la cita: ${error.message}`);
  }
};

/**
 * Actualiza una cita por ID.
 * @param {String} id - ID de la cita.
 * @param {Object} updateData - Datos a actualizar.
 * @returns {Object} - Cita actualizada.
 */
export const updateAppointment = async (id, updateData) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true })
      .populate('userId', 'name email')
      .populate('petId', 'nombre raza')
      .populate('serviceId', 'name price');
    if (!updatedAppointment) throw new Error('Cita no encontrada');
    return updatedAppointment;
  } catch (error) {
    throw new Error(`Error al actualizar la cita: ${error.message}`);
  }
};

/**
 * Elimina una cita por ID.
 * @param {String} id - ID de la cita.
 * @returns {Object} - Cita eliminada.
 */
export const deleteAppointment = async (id) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) throw new Error('Cita no encontrada');
    return deletedAppointment;
  } catch (error) {
    throw new Error(`Error al eliminar la cita: ${error.message}`);
  }
};