# Use Node.js as the base image
FROM node:18.16.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Install build dependencies
RUN apt-get update && apt-get install -y python3 make g++

# Rebuilding the bcrypt package
RUN npm rebuild bcrypt --build-from-source

# Define the port that will be used in the container
# EXPOSE 3000

# Running migrations
# RUN npm run migration:run

# Run the application when the container starts
CMD [ "npm", "run", "start:dev" ]
