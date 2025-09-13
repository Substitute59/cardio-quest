#!/bin/sh
set -e

echo "Waiting for Postgres..."
# Boucle pour attendre que Postgres réponde
until pg_isready -h $DB_HOST -p $DB_PORT; do
  echo "Postgres is unavailable - sleeping"
  sleep 2
done

echo "Applying Prisma migrations..."
pnpm prisma migrate deploy

echo "Starting NestJS..."
pnpm run start:prod
