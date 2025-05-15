#!/bin/sh
set -e

echo "Generating env from runtime variables..."
npm run generateenv

echo "Generating plugins config from runtime variables..."
npm run generatepluginsconfig

echo "Building Angular app..."
npm run build -- --configuration=production

echo "Copying build files to NGINX's web directory..."
# Clean default NGINX directory and copy the build output
rm -rf /var/www/html/*
cp -r dist/wacraft-client/browser/* /var/www/html/

echo "Starting NGINX..."
nginx -g "daemon off;"
