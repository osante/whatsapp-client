# Use a Node image that allows installing extra packages
FROM node:22-slim

# Install NGINX
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install dependencies (including Angular CLI if it's in package.json)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port 80 for NGINX
EXPOSE 80

# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script and ensure it's executable
COPY /scripts/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
