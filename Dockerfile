# Use official Node.js 22 image as base
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package files for dependency installation
# This is done before copying all files to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Expose port (change if your app uses a different port)
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]