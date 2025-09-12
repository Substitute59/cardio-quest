FROM node:latest

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./

RUN pnpm install

COPY prisma ./prisma/

RUN pnpm prisma:generate

COPY . .

EXPOSE 3001

CMD ["pnpm", "run", "dev"]