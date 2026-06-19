FROM node:20-alpine as builder
# RUN apk --no-cache --update
WORKDIR /back
COPY ./package* ./
ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN npm install
COPY . .
RUN npm run build
#CMD ["node", "index.js"]
EXPOSE 8002