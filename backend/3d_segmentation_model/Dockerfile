# Base stage for both development and production
FROM node:20-slim AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "preview"]