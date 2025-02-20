# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos esenciales primero (aprovechamos la caché de Docker)
COPY package*.json tsconfig.json ./

# Instala dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Compila TypeScript a JavaScript
RUN npm run build

# Expone el puerto 5000
EXPOSE 5000

# Ejecuta la app en producción
CMD ["npm", "run", "serve"]