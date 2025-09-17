# Use lightweight Node.js base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all project files into container
COPY . .

# Expose app port (change if your app runs on another port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
