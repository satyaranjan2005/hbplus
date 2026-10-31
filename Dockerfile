# ==============================================================================
# Stage 1: Build the Web Distribution
# ==============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./

# Install npm dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy project source files
COPY . .

# Build production web bundle (outputs to /app/dist)
RUN npm run build:web

# ==============================================================================
# Stage 2: Serve with Production-Grade Nginx
# ==============================================================================
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built web assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard web port
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

