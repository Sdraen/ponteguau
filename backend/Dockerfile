# Usa una imagen base oficial de Node.js (versión 18) como la base
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Establece las variables de entorno desde un archivo .env (opcional)
# Si estás usando Docker Compose, puedes configurar las variables de entorno ahí
# ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["npm", "start"]