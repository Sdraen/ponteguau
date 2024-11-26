import Joi from 'joi';

// Schema para validar los datos de una cita
export const appointmentSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'El ID del usuario debe ser un texto válido.',
    'any.required': 'El ID del usuario es obligatorio.',
  }),
  petId: Joi.string().required().messages({
    'string.base': 'El ID de la mascota debe ser un texto válido.',
    'any.required': 'El ID de la mascota es obligatorio.',
  }),
  serviceId: Joi.string().required().messages({
    'string.base': 'El ID del servicio debe ser un texto válido.',
    'any.required': 'El ID del servicio es obligatorio.',
  }),
  date: Joi.date().iso().required().messages({
    'date.base': 'La fecha debe ser válida.',
    'date.format': 'La fecha debe estar en formato ISO 8601.',
    'any.required': 'La fecha es obligatoria.',
  }),
  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.base': 'La hora de inicio debe ser un texto.',
      'string.pattern.base': 'La hora de inicio debe estar en formato HH:mm (24 horas).',
      'any.required': 'La hora de inicio es obligatoria.',
    }),
  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.base': 'La hora de fin debe ser un texto.',
      'string.pattern.base': 'La hora de fin debe estar en formato HH:mm (24 horas).',
      'any.required': 'La hora de fin es obligatoria.',
    }),
  status: Joi.string()
    .valid('pending', 'confirmed', 'cancelled')
    .default('pending')
    .messages({
      'string.base': 'El estado debe ser un texto.',
      'any.only': 'El estado debe ser uno de los siguientes: pending, confirmed, cancelled.',
    }),
});