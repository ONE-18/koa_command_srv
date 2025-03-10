FROM oven/bun:1 as base

WORKDIR /app

RUN apt-get update && apt-get install -y npm 
RUN curl -fsSL https://bun.sh/install | bash

CMD [ "npm", "run", "dev" ]