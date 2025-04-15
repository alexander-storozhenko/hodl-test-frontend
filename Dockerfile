# Build stage
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install vite -g
COPY . .

RUN vite build

# Production stage
FROM nginx:1.26.1-alpine-slim AS production

EXPOSE ${PORT}

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf.template

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]