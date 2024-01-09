#!/bin/bash

type="$1"

remote_user="root"
remote_host="111.229.82.31"
remote_path="/root/theia-browser-app"
#
#echo "clean"
#rm -rf examples/browser-app/lib
#
#echo "build:production"
#yarn --cwd examples/browser-app run build:production
#
#echo "打包"
#mkdir -p dist && tar -cvf ./dist/browser-app-lib.tar -C examples/browser-app lib

echo "开始上传"
scp -i "$HOME/Documents/yunhu-doc/new_2024_yunhu.pem" -r "./dist/browser-app-lib.tar" "$remote_user@$remote_host:$remote_path"

echo "远程解压"
ssh -i "$HOME/Documents/yunhu-doc/new_2024_yunhu.pem" "$remote_user@$remote_host" "cd $remote_path && tar -xvf browser-app-lib.tar"

echo "替换 native"
ssh -i "$HOME/Documents/yunhu-doc/new_2024_yunhu.pem" "$remote_user@$remote_host" "cd $remote_path/lib/backend && rm -rf native"
ssh -i "$HOME/Documents/yunhu-doc/new_2024_yunhu.pem" "$remote_user@$remote_host" "cd $remote_path/lib/backend && rm -rf native-webpack-plugin"
ssh -i "$HOME/Documents/yunhu-doc/new_2024_yunhu.pem" "$remote_user@$remote_host" "wget -P $remote_path/lib/backend https://common-1306445775.cos.ap-shanghai.myqcloud.com/theia_native/node-v21.5.0-native.tar"
ssh -i "$HOME/Documents/yunhu-doc/new_2024_yunhu.pem" "$remote_user@$remote_host" "cd $remote_path/lib/backend && tar -xvf node-v21.5.0-native.tar"

echo "重启 docker container"
ssh -i "$HOME/Documents/yunhu-doc/new_2024_yunhu.pem" "$remote_user@$remote_host" "docker restart cfa1d5b071b1"
