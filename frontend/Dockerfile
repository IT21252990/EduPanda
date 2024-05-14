# Stage 1: Build the React app
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build output to the nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
