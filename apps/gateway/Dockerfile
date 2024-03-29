FROM node:16-alpine AS base

FROM base as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN (cd apps/gateway/ && npx prisma generate)
RUN rm -Rf libs/dto/src/auth.ts libs/types/src/auth.ts
RUN npx nx build gateway --generatePackageJson --optimization


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist/apps/gateway ./
COPY apps/gateway/prisma ./prisma/
RUN npm install

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

# USER nest

EXPOSE 3001
## Launch the wait tool and then your application
CMD /wait && npx prisma migrate deploy && npx prisma generate && node ./main
