# =========================
# Stage 1: Dependencies
# =========================
FROM node:20-alpine AS deps
WORKDIR /app

# System deps (needed for sharp / imagemagick / binaries)
RUN apk add --no-cache \
    libc6-compat \
    imagemagick

# Enable pnpm via corepack (recommended)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile


# =========================
# Stage 2: Builder
# =========================
FROM node:20-alpine AS builder
WORKDIR /app

# System deps again (build stage)
RUN apk add --no-cache \
    libc6-compat \
    imagemagick

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy source code
COPY . .

# Build Next.js (this is where optimize-images runs)
RUN pnpm run build


# =========================
# Stage 3: Production runtime
# =========================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Runtime system deps (needed if image processing happens at runtime)
RUN apk add --no-cache \
    libc6-compat \
    imagemagick

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure uploads folder exists and is writable
RUN mkdir -p /app/public/uploads \
 && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', r => { if (r.statusCode !== 200) process.exit(1) })"

# Start Next.js standalone server
CMD ["node", "server.js"]
