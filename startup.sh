#!/bin/bash

echo "Starting Postgres..."
docker-compose up -d --wait
echo "Postgres started!"

echo "Migrating database..."
pnpm prisma db push
echo "Database migrated!"

echo "Starting server..."
pnpm dev
echo "Server started!"

