FROM node:22-slim AS build

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /app

WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run build

FROM node:22-slim

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY start.sh ./start.sh

COPY .env.example ./

RUN chmod +x start.sh

RUN npm install -g serve @import-meta-env/cli

EXPOSE 3000

ENTRYPOINT ["./start.sh"]