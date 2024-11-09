FROM node:14-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the port
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]