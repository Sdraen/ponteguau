
# Sistema de apoyo a la gestión de Citas y de Caninos en Peluquería Canina Ponteguau

Este proyecto es un sistema de gestión de citas para una peluquería canina llamado **Ponteguau**, que permite a los clientes agendar servicios de peluquería para sus mascotas. Incluye funcionalidades de autenticación, gestión de citas y administración de mascotas. El proyecto está desarrollado utilizando el stack MERN (MongoDB, Express, React, Node.js).

## Características Principales

- **Autenticación**: Registro de usuarios y manejo de roles. El rol asignado es `user` por defecto al crear una cuenta.
- **Gestión de Citas**: Los clientes pueden agendar citas para sus mascotas con los servicios de peluquería, incluyendo cortes, baño y deslanado. Cada cita tiene una duración de 3 horas y puede incluir un máximo de 2 mascotas.
- **Notificaciones por Correo Electrónico**: Confirmación de la cita enviada al cliente.
- **Modelado de Mascotas**: Registro de mascotas con imágenes del "antes" y "después" de la peluquería.

## Estructura del Proyecto

El proyecto está dividido en dos partes:

- **Backend**: API creada con Node.js, Express y MongoDB para gestionar la lógica de negocio.
- **Frontend**: Interfaz de usuario construida en React con Tailwind CSS para la gestión y visualización de citas.

---
