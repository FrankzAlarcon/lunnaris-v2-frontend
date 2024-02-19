FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_PUBLIC_SOCKET_URL https://lunnarisv2-dev-nmmm.1.us-1.fl0.io
ENV NEXTAUTH_SECRET 818a32d5af90533da174bca6c2da96a96f6cadbde02f25674136f963553a5dce

ENV AUTH_SERVICE_URL https://lunnaris-auth2-service-dev-hpkb.1.us-1.fl0.io/api
ENV USERS_SERVICE_URL https://lunnaris-users-dev-jctz.1.us-1.fl0.io/api
ENV CHAT_SERVICE_URL https://lunnaris-chat-dev-rdgk.1.us-1.fl0.io/api
ENV MEDIA_SERVICE_URL https://lunnaris-media-dev-fgpn.4.us-1.fl0.io/api
ENV FILES_SERVICE_URL https://lunnaris-files-dev-bcza.1.us-1.fl0.io/api/v1
ENV NEXT_PUBLIC_FILES_SERVICE_URL https://lunnaris-files-dev-bcza.1.us-1.fl0.io/api/v1
ENV NEXT_PUBLIC_AUTH_SERVICE_URL https://lunnaris-auth2-service-dev-hpkb.1.us-1.fl0.io/api
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]