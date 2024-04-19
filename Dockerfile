FROM node:20.10.0-alpine

WORKDIR /app
COPY . .

RUN npm i -g pnpm

RUN pnpm i

CMD ["pnpm", "run", "dev"]