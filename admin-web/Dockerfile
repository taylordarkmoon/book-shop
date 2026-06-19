FROM node:22-alpine AS builder

WORKDIR /app

# Устанавливаем yarn
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Копируем package.json
COPY package.json ./

# Устанавливаем зависимости через yarn
RUN yarn install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN yarn build

FROM nginx:alpine

RUN apk add --no-cache curl

COPY --from=builder /app/dist /usr/share/nginx/html/admin
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]