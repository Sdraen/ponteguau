"use strict";

import Joi from "joi";

/**
 * Esquema de validación para el cuerpo de la solicitud de mascota.
 * @constant {Object}
 */
const mascotaSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser de tipo string."
  }),
  fecha_nacimiento: Joi.date().required().messages({
    "any.required": "La fecha de nacimiento es obligatoria.",
    "date.base": "La fecha de nacimiento debe ser de tipo fecha."
  }),
  edad: Joi.number().required().messages({
    "any.required": "La edad es obligatoria.",
    "number.base": "La edad debe ser un número."
  }),
  sexo: Joi.string().valid('Macho', 'Hembra').required().messages({
    "any.required": "El sexo es obligatorio.",
    "any.only": "El sexo debe ser 'Macho' o 'Hembra'."
  }),
  raza: Joi.string().required().messages({
    "string.empty": "La raza no puede estar vacía.",
    "any.required": "La raza es obligatoria.",
    "string.base": "La raza debe ser de tipo string."
  }),
  peso: Joi.number().required().messages({
    "any.required": "El peso es obligatorio.",
    "number.base": "El peso debe ser un número."
  }),
  chip: Joi.boolean().required().default(false).messages({
    "any.required": "El chip es obligatorio.",
    "boolean.base": "El valor del chip debe ser booleano."
  }),
  esterilizado: Joi.boolean().required().messages({
    "any.required": "El campo esterilizado es obligatorio.",
    "boolean.base": "El valor de esterilizado debe ser booleano."
  }),
  enfermedades: Joi.string().required().messages({
    "string.empty": "El campo de enfermedades no puede estar vacío.",
    "any.required": "El campo de enfermedades es obligatorio.",
    "string.base": "El campo de enfermedades debe ser de tipo string."
  }),
  otitis: Joi.boolean().required().messages({
    "any.required": "El campo otitis es obligatorio.",
    "boolean.base": "El valor de otitis debe ser booleano."
  }),
  pulgas: Joi.boolean().required().messages({
    "any.required": "El campo pulgas es obligatorio.",
    "boolean.base": "El valor de pulgas debe ser booleano."
  }),
  heridas: Joi.boolean().required().messages({
    "any.required": "El campo heridas es obligatorio.",
    "boolean.base": "El valor de heridas debe ser booleano."
  }),
  personalidad: Joi.string().required().messages({
    "string.empty": "El campo personalidad no puede estar vacío.",
    "any.required": "El campo personalidad es obligatorio.",
    "string.base": "El campo personalidad debe ser de tipo string."
  }),
  recordatorio: Joi.string().required().messages({
    "string.empty": "El campo recordatorio no puede estar vacío.",
    "any.required": "El campo recordatorio es obligatorio.",
    "string.base": "El campo recordatorio debe ser de tipo string."
  }),
  nota: Joi.number().required().messages({
    "any.required": "El campo nota es obligatorio.",
    "number.base": "El campo nota debe ser un número."
  }),
  nodos: Joi.number().required().messages({
    "any.required": "El campo nodos es obligatorio.",
    "number.base": "El campo nodos debe ser un número."
  }),
  imagenAntes: Joi.string().optional().messages({
    "string.base": "El campo imagenAntes debe ser de tipo string."
  }),
  imagenDespues: Joi.string().optional().messages({
    "string.base": "El campo imagenDespues debe ser de tipo string."
  }),
  propietario: Joi.string().required().messages({
    "any.required": "El propietario es obligatorio.",
    "string.base": "El propietario debe ser un ID de tipo string."
  }),
  historialCitas: Joi.array().items(Joi.string()).optional().messages({
    "string.base": "Cada ID de cita en historialCitas debe ser de tipo string."
  }),
  notasAdicionales: Joi.array().items(Joi.string()).optional().messages({
    "string.base": "Cada nota en notasAdicionales debe ser de tipo string."
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales."
});

// Esquema de validación para el ID de mascota
const mascotaIdSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "El ID de la mascota es obligatorio.",
    "string.base": "El ID debe ser un string."
  })
});

export { mascotaSchema, mascotaIdSchema };