#!/bin/bash

rm -rf package-lock.json && rm -rf node_modules/ && git pull origin master && npm i && pm2 restart app && echo "服务启动成功"