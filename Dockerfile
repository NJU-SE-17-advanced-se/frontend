FROM nginx:1.16.1

# nginx conf
COPY ci/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ci/nginx/default.conf /etc/nginx/conf.d/default.conf
# modules
COPY ci/nginx/modules /etc/nginx/modules

# frontend prod
COPY dist /etc/nginx/html/dist
