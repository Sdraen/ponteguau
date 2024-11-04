
# Ponteguau - Sistema de Gestión de Citas para Peluquería Canina

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

## Requisitos

- Node.js y npm
- Docker (opcional para contenedorización)

## Instalación

### Clonar el Repositorio

```bash
git clone https://github.com/Sdraen/ponteguau.git
cd ponteguau
```

### Backend

1. Navega al directorio del backend:

   ```bash
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` en el directorio `backend` con las siguientes variables:

   ```env
   MONGO_URI=<Tu URI de MongoDB>
   JWT_SECRET=<Tu llave secreta para JWT>
   EMAIL_SERVICE=<Servicio de correo electrónico>
   EMAIL_USER=<Usuario del correo>
   EMAIL_PASSWORD=<Contraseña del correo>
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

   El servidor se ejecutará en `http://localhost:5000`.

### Frontend

1. Navega al directorio del frontend:

   ```bash
   cd ../frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env` en el directorio `frontend` con las siguientes variables:

   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Inicia la aplicación de React:

   ```bash
   npm start
   ```

   La aplicación se ejecutará en `http://localhost:3000`.

---

## Contenedorización (Docker)

Puedes ejecutar el proyecto con Docker para simplificar la configuración. Asegúrate de tener Docker instalado y luego sigue estos pasos:

1. Crea un archivo `Dockerfile` en cada subdirectorio (`frontend` y `backend`) según las especificaciones de cada uno.
2. Desde la raíz del proyecto, ejecuta:

   ```bash
   docker-compose up --build
   ```

   Esto levantará ambos servicios (backend y frontend) en contenedores Docker.

---

## Uso

1. Regístrate como usuario en la plataforma.
2. Agrega información de tus mascotas, incluyendo fotos.
3. Agenda citas disponibles según las restricciones de horarios y servicios ofrecidos.
4. Recibirás una notificación por correo electrónico al confirmar la cita.

---

## Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un *fork* del repositorio y envía tus cambios a través de un *pull request*.

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

---
