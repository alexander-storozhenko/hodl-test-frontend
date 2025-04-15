#!/bin/sh

# Replace environment variables in nginx configuration
envsubst '\$PORT' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
exec nginx -g 'daemon off;'