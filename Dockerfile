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

# Compile TypeScript to JavaScript
RUN npm run build

# Define the port that will be used in the container
EXPOSE 3000

# Run the application when the container starts
CMD [ "npm", "start" ]
