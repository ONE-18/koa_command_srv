# FROM oven/bun:1 as base
FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y npm 
RUN curl -fsSL https://bun.sh/install | bash
 
CMD [ "npm", "run", "dev" ]