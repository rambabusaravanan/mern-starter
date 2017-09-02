# specify the node base image with your desired version node:<version>
FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json .
# Bundle app source
COPY . .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./
RUN npm install && npm run build

EXPOSE 5000
CMD [ "node", "server" ]