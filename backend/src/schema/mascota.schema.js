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
  color: Joi.string().required().messages({
    "string.empty": "El color no puede estar vacío.",
    "any.required": "El color es obligatorio.",
    "string.base": "El color debe ser de tipo string."
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
  permitirFotos: Joi.boolean().required().messages({
    "any.required": "El campo permitirFotos es obligatorio.",
    "boolean.base": "El valor de permitirFotos debe ser booleano."
  }),
  imagenPrevia: Joi.string().optional().messages({
    "string.base": "El campo imagenPrevia debe ser de tipo string."
  })
}).messages({
  "object.unknown": "No se permiten propiedades adicionales."
});

export { mascotaSchema };