
# Ponteguau - Backend del Sistema de Gestión de Citas para Peluquería Canina

Software de gestión de citas y control de servicios para una peluquería canina. Este sistema permite a los usuarios agendar servicios para sus mascotas y controlar el flujo de citas mediante una API desarrollada en Node.js y Express, con almacenamiento en MongoDB.

---

## Instalación Inicial en Ubuntu Jammy (22.04)

### Paso 1: Actualizar el Sistema

1. Abre una terminal y actualiza la lista de paquetes disponibles:

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

### Paso 2: Instalar Git

1. Instala Git, necesario para clonar el repositorio:

   ```bash
   sudo apt install -y git
   ```

2. Verifica que Git se instaló correctamente:

   ```bash
   git --version
   ```

---

### Paso 3: Instalar Node.js y NPM

1. Instala `curl` si aún no lo tienes:

   ```bash
   sudo apt install -y curl
   ```

2. Descarga e instala Node.js (versión recomendada):

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. Verifica la instalación:

   ```bash
   node -v
   npm -v
   ```

---

### Paso 4: Instalar MongoDB

1. Agrega la clave GPG del repositorio oficial de MongoDB:

   ```bash
   curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-keyring.gpg
   ```

2. Agrega el repositorio de MongoDB:

   ```bash
   echo "deb [signed-by=/usr/share/keyrings/mongodb-keyring.gpg] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. Instala MongoDB:

   ```bash
   sudo apt update
   sudo apt install -y mongodb-org
   ```

4. Inicia y habilita el servicio de MongoDB:

   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

5. Verifica que MongoDB esté funcionando:

   ```bash
   sudo systemctl status mongod
   ```

---

### Paso 5: Clonar el Repositorio

1. Clona el repositorio en tu dispositivo:

   ```bash
   git clone https://github.com/Sdraen/ponteguau.git
   ```

2. Navega al directorio del backend:

   ```bash
   cd ponteguau/backend
   ```

---

### Paso 6: Configurar el Archivo `.env`

1. Crea un archivo `.env` en el directorio `backend`:

   ```bash
   nano .env
   ```

2. Añade las siguientes variables de entorno (modifica según sea necesario):

   ```env
   PORT=3000
   DB_URL=mongodb+srv://<username>:<password>@cluster0.vbnw7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ACCESS_JWT_SECRET=<tu_jwt_secret>
   REFRESH_JWT_SECRET=<tu_refresh_jwt_secret>
   RESEND_API_KEY=<tu_resend_api_key>
   ```

3. Guarda y cierra el archivo (Ctrl + O, Enter, Ctrl + X).

---

### Paso 7: Instalar Dependencias del Proyecto

1. Instala las dependencias del backend:

   ```bash
   npm install
   ```

---

### Paso 8: Ejecutar el Servidor

1. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

2. Accede al backend en tu navegador o con herramientas como Postman:

   ```
   http://localhost:3000
   ```

---

### Paso 9: Opcional - Usar Docker (para un entorno aislado)

1. Construye la imagen de Docker:

   ```bash
   docker build -t ponteguau-backend .
   ```

2. Ejecuta el contenedor:

   ```bash
   docker run -p 3000:3000 ponteguau-backend
   ```

---

Tu backend ahora está configurado y listo para usarse en Ubuntu Jammy. 🚀