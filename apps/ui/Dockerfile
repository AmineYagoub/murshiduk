FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run ui:build && npx nx run ui:postbuild


# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app


ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/ui ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/ui/.next ./.next
COPY apps/ui/package.json /app/package.json
# RUN npm pkg set dependencies.sharp="latest" && npm pkg set dependencies.ky="latest" && npm install && npm cache clean --force
RUN npm install && npm cache clean --force

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]
