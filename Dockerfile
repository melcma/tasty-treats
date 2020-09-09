FROM nginx:alpine

COPY config/tasty.conf /etc/nginx/conf.d
COPY client /usr/share/nginx/html