
# Ponteguau - Backend del Sistema de Gestión de Citas para Peluquería Canina

Software de gestión de citas y control de servicios para una peluquería canina. Este sistema permite a los usuarios agendar servicios para sus mascotas y controlar el flujo de citas mediante una API desarrollada en Node.js y Express, con almacenamiento en MongoDB.

## Stack de Software

La arquitectura del backend está compuesta por:

- **NodeJS** (v18.20.2)
- **ExpressJS** (v4.18.2)
- **MongoDB** (v6.6.2)
- **JWT** (v9.0.2)
- **Nodemailer** para notificaciones por correo electrónico
- **Docker** para contenedorización
- **NPM** (v10.2.4)

## Configuración de la Base de Datos MongoDB

### Paso 1: Crear una Cuenta en MongoDB y Configurar el Cluster

1. Visita el sitio web de [MongoDB](https://www.mongodb.com/) y regístrate para obtener una cuenta nueva.
2. Crea una nueva base de datos o un cluster siguiendo las instrucciones en la [documentación de MongoDB](https://docs.mongodb.com/guides/cloud/).
3. Guarda la URI de conexión (URI "Connect to your application") para tu base de datos, ya que la necesitarás más adelante. Asegúrate de reemplazar `<password>` con tu propia contraseña.
4. Añade tu dirección IP actual a la lista de IPs permitidas (IP whitelist) en MongoDB para permitir conexiones. Tendrás que actualizar esto cada vez que cambie tu IP.

### Paso 2: Configurar el Archivo de Entorno

1. Navega al directorio `/backend` y localiza el archivo `.env`.

   Este archivo almacenará las variables de entorno necesarias para que el proyecto funcione.

### Paso 3: Actualizar la URI de MongoDB

1. En el archivo `.env`, busca la línea que dice:

   ```env
   DB_URL="your-mongodb-uri"
   ```

2. Reemplaza `"your-mongodb-uri"` con la URI de conexión de tu base de datos MongoDB.

### Ejemplo de Configuración del Archivo `.env`

```env
PORT=3000
HOST=localhost
DB_URL=mongodb+srv://<username>:<password>@cluster0.vbnw7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ACCESS_JWT_SECRET=<tu_jwt_secret>
REFRESH_JWT_SECRET=<tu_refresh_jwt_secret>
RESEND_API_KEY=<tu_resend_api_key>
```

Recuerda mantener seguro este archivo y no compartir tus credenciales en repositorios públicos.

## Instalación de Dependencias del Backend

1. En la terminal, navega al directorio `/backend`:

   ```bash
   cd backend
   ```

2. Ejecuta el siguiente comando para instalar las dependencias del backend:

   ```bash
   npm install
   ```

   Este comando instalará todos los paquetes necesarios especificados en el archivo `package.json`.

## Clonar el Repositorio

Para obtener el proyecto, ejecuta este comando en la carpeta donde deseas clonarlo:

```bash
git clone https://github.com/Sdraen/ponteguau
```

Una vez clonado, navega al directorio `backend` para configurar y ejecutar el entorno.

## Ambiente de Desarrollo

Para configurar el entorno de desarrollo en un servidor Ubuntu:

1. Accede al servidor en modo root:

   ```bash
   sudo su
   ```

2. Actualiza el sistema operativo:

   ```bash
   apt-get update
   ```

3. Instala dependencias necesarias como Git, Nano y NVM:

   ```bash
   apt-get install -y curl git nano
   curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
   exec bash
   nvm install 18.16.0
   nvm alias default 18.16.0
   nvm use default
   ```

4. Instala Yarn para manejar dependencias y PM2 para ejecutar el backend en producción:

   ```bash
   npm install -g yarn pm2
   ```

5. Clona el repositorio como se indicó anteriormente y navega al directorio `backend`.

6. Instala las dependencias del proyecto:

   ```bash
   yarn install
   ```

7. Crea el archivo `.env` e ingresa las variables para la conexión con la base de datos y el puerto.

   ```bash
   touch .env
   nano .env
   ```

   Variables de ejemplo para `.env`:

   ```env
   PORT=3000
   DB_URL="mongodb+srv://<username>:<password>@cluster0.vbnw7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   ```

8. Para ejecutar el backend en producción:

   ```bash
   pm2 start yarn -- start
   ```

## Acceso al Backend

Una vez configurado y ejecutado, puedes acceder al backend en:

```
http://<ip-servidor>:3000
```

---
## Docker

Para construir y ejecutar el backend en un contenedor Docker:

1. Abre una terminal en la carpeta raíz del backend donde se clonó el repositorio.

2. Ejecuta el siguiente comando para construir la imagen del backend:

   ```bash
   docker build -t backend .
   ```

3. Una vez creada la imagen, corre el contenedor con:

   ```bash
   docker run --rm -ti -p 3000:3000 -v ${pwd}:/home backend
   ```

4. Dentro del contenedor, instala las dependencias y ejecuta el backend:

   ```bash
   cd home
   npm install
   npm start
   ```