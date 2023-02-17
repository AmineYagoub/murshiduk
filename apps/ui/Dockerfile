FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npx nx build ui --optimization


# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app


ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/ui ./
RUN npm install
RUN npm install sharp

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]