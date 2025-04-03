# FROM oven/bun:1 as base
FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y npm 
RUN npm install -D vite
 
CMD [ "npm", "run", "dev" ]