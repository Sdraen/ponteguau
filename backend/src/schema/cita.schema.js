"use strict";

import Joi from "joi";

/**
 * Esquema de validación para el cuerpo de la solicitud de cita.
 * @constant {Object}
 */
const citaSchema = Joi.object({
  fecha: Joi.date().required().messages({
    "any.required": "La fecha de la cita es obligatoria.",
    "date.base": "La fecha de la cita debe ser de tipo fecha."
  }),
  mascota: Joi.string().required().messages({
    "any.required": "La mascota es obligatoria.",
    "string.base": "La mascota debe ser un ID de tipo string."
  }),
  propietario: Joi.string().required().messages({
    "any.required": "El propietario es obligatorio.",
    "string.base": "El propietario debe ser un ID de tipo string."
  }),
  servicio: Joi.string().valid('Peluquería', 'Retoque', 'Baño', 'Deslanado').required().messages({
    "any.required": "El tipo de servicio es obligatorio.",
    "any.only": "El tipo de servicio debe ser 'Peluquería', 'Retoque', 'Baño' o 'Deslanado'.",
    "string.base": "El tipo de servicio debe ser de tipo string."
  }),
  estado: Joi.string().valid('Pendiente', 'Confirmada', 'Completada', 'Cancelada').default('Pendiente').messages({
    "any.only": "El estado de la cita debe ser 'Pendiente', 'Confirmada', 'Completada' o 'Cancelada'.",
    "string.base": "El estado de la cita debe ser de tipo string."
  }),
  notas: Joi.string().optional().messages({
    "string.base": "El campo notas debe ser de tipo string."
  }),
  imagenAntes: Joi.string().optional().messages({
    "string.base": "El campo imagenAntes debe ser de tipo string."
  }),
  imagenDespues: Joi.string().optional().messages({
    "string.base": "El campo imagenDespues debe ser de tipo string."
  })
}).messages({
  "object.unknown": "No se permiten propiedades adicionales."
});

export { citaSchema };