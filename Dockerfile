FROM node:8 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run release

FROM nginx:1-alpine

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

ADD ./nginx-spa.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/web /usr/html
