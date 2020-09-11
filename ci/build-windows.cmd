:: build nuxt release
call npm run build
:: set current time as version
:: fix one-bit time
set now=%time: =0%
set version=%date:~0,4%%date:~5,2%%date:~8,2%%now:~0,2%%now:~3,2%%now:~6,2%
:: build docker image
docker build -t registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:%version% .
:: add latest tag
docker tag ^
registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:%version% ^
registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:latest
:: push image
docker push registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:%version%
docker push registry.cn-hangzhou.aliyuncs.com/advanced-se/frontend:latest
:: do push
git push
