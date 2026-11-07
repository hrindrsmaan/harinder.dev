# syntax=docker/dockerfile:1.7

# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps with a clean, reproducible install
COPY package.json package-lock.json ./
RUN npm ci

# Build the Vite app
COPY . .

RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine AS runner

# SPA-aware nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static assets from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
