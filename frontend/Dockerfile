# Use the official Node.js image
FROM node:20.13.1 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 for the frontend app
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
