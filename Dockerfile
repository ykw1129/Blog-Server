FROM node:18-alpine3.15
WORKDIR /project
COPY package.json .
RUN npm install
COPY . .
