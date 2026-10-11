# syntax=docker/dockerfile:1.7

# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps with a clean, reproducible install
COPY package.json package-lock.json ./
RUN npm ci

# Build the Vite app
COPY . .

# Vite inlines VITE_* vars at build time, so they must be passed as build args
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

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
