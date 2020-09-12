#!/bin/sh

# get app's id
proxy_id=$(sudo docker container ls -aqf name="frontend")
if [ "$proxy_id" ]; then
  sudo docker container rm -v -f "$proxy_id"
else
  echo 'no service'
fi

# pull & restart
sudo docker pull registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:latest
sudo docker run -d \
  --name frontend \
  --network host \
  -p 80:80 \
  -p 443:443 \
  -v /root/server-ssh-keys/wensun.top.pem:/etc/nginx/cert/wensun.top.pem \
  -v /root/server-ssh-keys/wensun.top.key:/etc/nginx/cert/wensun.top.key \
  registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:latest
