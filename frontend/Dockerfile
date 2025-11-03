# Base stage for both development and production
FROM node:20-slim AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production build stage
FROM base AS builder
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build

# Production runtime stage
FROM node:20-slim AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
EXPOSE 3000
CMD ["node", "server.js"]