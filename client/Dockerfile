FROM node:22.22.2 AS build

ARG NEXT_PUBLIC_EXPRESS_URL
ENV NEXT_PUBLIC_EXPRESS_URL=$NEXT_PUBLIC_EXPRESS_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22.22.2-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]