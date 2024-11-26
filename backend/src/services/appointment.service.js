import Appointment from '../models/Appointment.model.js';
import { sendEmail } from '../utils/emailService.js';

/**
 * Crea una nueva cita.
 * @param {Object} appointmentData - Datos de la cita.
 * @returns {Object} - Cita creada.
 */
export const createAppointment = async (appointmentData) => {
  try {
    const appointment = new Appointment(appointmentData);
    const savedAppointment = await appointment.save();

    // Enviar correo de confirmación
    await sendEmail({
      email: appointmentData.userEmail,
      subject: 'Confirmación de Cita - Ponteguau',
      template: 'appointmentConfirmation',
      data: {
        name: appointmentData.userName,
        appointment: {
          date: savedAppointment.date,
          startTime: savedAppointment.startTime,
          endTime: savedAppointment.endTime,
        },
      },
    });

    return savedAppointment;
  } catch (error) {
    throw new Error(`Error al crear la cita: ${error.message}`);
  }
};

/**
 * Obtiene todas las citas de un usuario.
 * @param {String} userId - ID del usuario.
 * @returns {Array} - Lista de citas.
 */
export const getUserAppointments = async (userId) => {
  try {
    return await Appointment.find({ userId })
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
      .populate('petId', 'nombre raza')
      .populate('serviceId', 'name price');

    if (!appointment) throw new Error('Cita no encontrada');
    return appointment;
  } catch (error) {
    throw new Error(`Error al obtener la cita: ${error.message}`);
  }
};

/**
 * Actualiza una cita.
 * @param {String} id - ID de la cita.
 * @param {Object} updateData - Datos a actualizar.
 * @returns {Object} - Cita actualizada.
 */
export const updateAppointment = async (id, updateData, userEmail, userName) => {
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) throw new Error('Cita no encontrada');

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (updateData.status === 'cancelled') {
      await sendEmail({
        email: userEmail,
        subject: 'Cancelación de Cita - Ponteguau',
        template: 'appointmentCancellation',
        data: {
          name: userName,
          appointment: {
            date: updatedAppointment.date,
            startTime: updatedAppointment.startTime,
            endTime: updatedAppointment.endTime,
          },
        },
      });
    }

    return updatedAppointment;
  } catch (error) {
    throw new Error(`Error al actualizar la cita: ${error.message}`);
  }
};

/**
 * Elimina una cita.
 * @param {String} id - ID de la cita.
 * @param {String} userEmail - Correo del usuario.
 * @param {String} userName - Nombre del usuario.
 * @returns {Object} - Cita eliminada.
 */
export const deleteAppointment = async (id, userEmail, userName) => {
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) throw new Error('Cita no encontrada');

    await appointment.deleteOne();

    await sendEmail({
      email: userEmail,
      subject: 'Cancelación de Cita - Ponteguau',
      template: 'appointmentCancellation',
      data: {
        name: userName,
        appointment: {
          date: appointment.date,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
        },
      },
    });

    return appointment;
  } catch (error) {
    throw new Error(`Error al eliminar la cita: ${error.message}`);
  }
};