#!/bin/sh

# Set default load balancer IP if not provided via env variable
if [ -z "$LOAD_BALANCER_IP" ]; then
  echo "LOAD_BALANCER_IP is not set. Using default localhost."
  LOAD_BALANCER_IP="http://localhost"
fi

# Set default ADD_PORT if not provided via env variable
if [ -z "$ADD_PORT" ]; then
  echo "ADD_PORT is not set. Using default 3001."
  ADD_PORT="3001"
fi

# Set default SEARCH_PORT if not provided via env variable
if [ -z "$SEARCH_PORT" ]; then
  echo "SEARCH_PORT is not set. Using default 3001."
  SEARCH_PORT="3002"
fi
# Create the config.js file dynamically with the Load Balancer IP
cat <<EOF > /usr/share/nginx/html/config.js
window.ENV = {
  LOAD_BALANCER_IP: '${LOAD_BALANCER_IP}',
  ADD_PORT: '${ADD_PORT}',
  SEARCH_PORT: '${SEARCH_PORT}'
};
EOF

# Start Nginx
nginx -g 'daemon off;'