# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base

ENV PNPM_HOME=/usr/local/share/pnpm \
    PATH=$PNPM_HOME:$PATH

WORKDIR /app

RUN apk add --no-cache python3 make g++ git curl \
    && npm install -g pnpm@10.12.4

FROM base AS builder

# Copy dependency manifests first for better caching
COPY package.json pnpm-lock.yaml tsconfig.json config.yaml schema.graphql ./
COPY src ./src

# Pre-generate code so pnpm can install the generated workspace package
RUN ENVIO_VERSION=$(node -p "require('./package.json').dependencies?.envio || ''") \
    && if [ -z "$ENVIO_VERSION" ] || [ "$ENVIO_VERSION" = "latest" ]; then \
         echo "Please pin envio dependency version" && exit 1; \
       fi \
    && pnpm dlx envio@"$ENVIO_VERSION" codegen

# Install project dependencies (generated now exists with a package.json)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Rebuild generated artifacts using the workspace-installed envio
RUN rm -rf generated \
    && pnpm codegen

FROM base AS runtime

ENV NODE_ENV=production

# Copy compiled application with installed dependencies
COPY --from=builder /app /app

WORKDIR /app

EXPOSE 8001

# Execute via ts-node so TypeScript handlers are transpiled at runtime
CMD ["node", "-r", "ts-node/register/transpile-only", "generated/src/Index.res.js"]
