FROM node:latest

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./

COPY tsconfig.json ./

RUN pnpm install

COPY prisma ./prisma/

RUN pnpm prisma:generate

COPY . .

COPY entrypoint.sh ./

RUN chmod +x entrypoint.sh

ENV NODE_ENV=production

ENV DB_HOST=postgres

ENV DB_PORT=5432

EXPOSE 3001

CMD ["./entrypoint.sh"]