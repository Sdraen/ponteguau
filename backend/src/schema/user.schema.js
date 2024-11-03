"use strict";

import Joi from "joi";
import ROLES from "../constants/roles.constants.js";

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const userBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser de tipo string.",
  }),
  rut: Joi.string().required().min(9).max(10)
    .pattern(/^[0-9]+[-|‐]{1}[0-9kK]{1}$/).messages({
      "string.empty": "El RUT no puede estar vacío.",
      "any.required": "El RUT es obligatorio.",
      "string.base": "El RUT debe ser de tipo string.",
      "string.min": "El RUT debe tener al menos 9 caracteres.",
      "string.max": "El RUT debe tener un máximo de 10 caracteres.",
      "string.pattern.base": "El RUT debe tener el formato XXXXXXXX-X, ejemplo: 12345678-9.",
    }),
  telefono: Joi.string().required().messages({
    "string.empty": "El teléfono no puede estar vacío.",
    "any.required": "El teléfono es obligatorio.",
    "string.base": "El teléfono debe ser de tipo string.",
  }),
  direccion: Joi.string().required().messages({
    "string.empty": "La dirección no puede estar vacía.",
    "any.required": "La dirección es obligatoria.",
    "string.base": "La dirección debe ser de tipo string.",
  }),
  comuna: Joi.string().required().messages({
    "string.empty": "La comuna no puede estar vacía.",
    "any.required": "La comuna es obligatoria.",
    "string.base": "La comuna debe ser de tipo string.",
  }),
  password: Joi.string().required().min(5).messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "any.required": "El email es obligatorio.",
    "string.base": "El email debe ser de tipo string.",
    "string.email": "El email debe tener un formato válido.",
  }),
  roles: Joi.array()
    .items(Joi.string().valid(...ROLES))
    .required()
    .messages({
      "array.base": "El rol debe ser de tipo array.",
      "any.required": "El rol es obligatorio.",
      "string.base": "El rol debe ser de tipo string.",
      "any.only": "El rol proporcionado no es válido.",
    }),
  newPassword: Joi.string().min(5).messages({
    "string.empty": "La nueva contraseña no puede estar vacía.",
    "string.base": "La nueva contraseña debe ser de tipo string.",
    "string.min": "La nueva contraseña debe tener al menos 5 caracteres.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const userIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

export { userBodySchema, userIdSchema };
