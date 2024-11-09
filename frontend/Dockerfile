FROM nginx:alpine

# Copy the HTML, CSS, and JS files
COPY index.html /usr/share/nginx/html/
COPY index.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/

# Copy the entrypoint script for dynamic config generation
COPY entrypoint.sh /entrypoint.sh

# Ensure the entrypoint script is executable
RUN chmod +x /entrypoint.sh

# Set entrypoint to the script
ENTRYPOINT ["/entrypoint.sh"]

# Expose port 80 for Nginx
EXPOSE 80