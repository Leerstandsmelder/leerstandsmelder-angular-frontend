FROM nginx:1-alpine

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

ADD ./nginx-spa.conf /etc/nginx/conf.d/default.conf
ADD ./dist/web /usr/html/
