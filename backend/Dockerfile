# Usa la imagen base de Ubuntu Jammy
FROM ubuntu:jammy

# Instala las dependencias necesarias
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Descarga y extrae Node.js versión 20.11.1
ADD https://nodejs.org/dist/v20.11.1/node-v20.11.1-linux-x64.tar.xz /usr/local/node.tar.xz
RUN tar -xJf /usr/local/node.tar.xz -C /usr/local --strip-components=1 && \
    rm /usr/local/node.tar.xz

# Verifica la instalación de Node.js
RUN node -v && npm -v

# Crea el directorio de la aplicación y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para correr el backend en modo de desarrollo
CMD ["npm", "run", "dev"]