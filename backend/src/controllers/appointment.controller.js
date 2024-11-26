import * as appointmentService from '../services/appointment.service.js';
import { appointmentSchema } from '../schemas/appointment.schema.js';

export const createAppointment = async (req, res, next) => {
  try {
    // Validar los datos de entrada con Joi
    const validatedData = await appointmentSchema.validateAsync(
      {
        ...req.body,
        userId: req.user._id,
        userEmail: req.user.email,
        userName: req.user.name,
      },
      { abortEarly: false }
    );

    // Crear la cita usando el servicio
    const appointment = await appointmentService.createAppointment(validatedData);

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    if (error.isJoi) {
      // Si es un error de validación, enviar un código de estado 400
      res.status(400).json({ success: false, errors: error.details });
    } else {
      console.error('Error creating appointment:', error.message);
      next(error);
    }
  }
};

export const getUserAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getUserAppointments(req.user._id);
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching user appointments:', error.message);
    next(error);
  }
};

export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id);

    // Verificar si el usuario tiene acceso a la cita
    if (appointment.userId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this appointment' });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error fetching appointment:', error.message);
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    // Validar los datos de entrada con Joi
    const validatedData = await appointmentSchema.validateAsync(
      {
        ...req.body,
        userId: req.user._id,
        userEmail: req.user.email,
        userName: req.user.name,
      },
      { abortEarly: false }
    );

    // Actualizar la cita usando el servicio
    const appointment = await appointmentService.updateAppointment(
      req.params.id,
      validatedData,
      req.user.email,
      req.user.name
    );

    res.json({ success: true, data: appointment });
  } catch (error) {
    if (error.isJoi) {
      // Si es un error de validación, enviar un código de estado 400
      res.status(400).json({ success: false, errors: error.details });
    } else {
      console.error('Error updating appointment:', error.message);
      next(error);
    }
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.deleteAppointment(req.params.id, req.user.email, req.user.name);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting appointment:', error.message);
    next(error);
  }
};