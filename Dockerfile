FROM node:16.18.0-bullseye
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm i
RUN pnpm run build
CMD ["pnpm", "start"]