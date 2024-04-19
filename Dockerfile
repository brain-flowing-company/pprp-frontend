FROM node:20.10.0-alpine

WORKDIR /app

RUN npm i -g pnpm

COPY package.json /app
COPY pnpm-lock.yaml /app
RUN pnpm i

COPY . .

CMD ["pnpm", "run", "dev"]