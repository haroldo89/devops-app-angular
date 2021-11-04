# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
FROM node:12.16.1-alpine As builder
# Set the working directory
WORKDIR /usr/src/app
# Add the source code to app
COPY package.json package-lock.json ./
# Install all the dependencies
RUN npm install
COPY . .
# Generate the build of the application
RUN npm run build --prod

# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:1.15.8-alpine
# Copy and replace the default nginx contents.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy the build output. 
COPY --from=builder /usr/src/app/dist/taller/ /usr/share/nginx/html

EXPOSE 80
