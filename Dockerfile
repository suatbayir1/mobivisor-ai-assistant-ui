# ---------- 1. BASE STAGE ----------
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY .env .env

# ---------- 2. DEVELOPMENT STAGE ----------
FROM base AS dev
ENV NODE_ENV=development
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "run", "dev"]

# ---------- 3. PRODUCTION BUILD STAGE ----------
FROM base AS builder
ENV NODE_ENV=production
COPY . .
RUN npm install --legacy-peer-deps --include=dev
RUN npm run build

# ---------- 4. PRODUCTION RUNTIME STAGE ----------
FROM node:20-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
