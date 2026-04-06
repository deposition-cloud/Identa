FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS dev
COPY . .
ENV NODE_ENV=development
CMD ["dumb-init", "pnpm", "dev", "--host", "0.0.0.0", "--port", "3000"]

FROM deps AS build
COPY . .
RUN pnpm build

FROM base AS release
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=build /app/.output ./.output
CMD ["dumb-init", "node", ".output/server/index.mjs"]
