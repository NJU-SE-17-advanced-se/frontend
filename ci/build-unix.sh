#!/bin/sh

# build nuxt release
sudo npm run build
# set current time as version
version=$(date "+%Y%m%d%H%M%S")
# build docker image
sudo docker build -t registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:"${version}" .
# add latest tag
sudo docker tag \
registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:"${version}" \
registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:latest
# push image
sudo docker push registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:"${version}"
sudo docker push registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:latest
# do push
sudo git push
