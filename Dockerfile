FROM node:18-alpine3.15
WORKDIR /project
COPY package.json .
RUN npm config get registry
RUN npm config set registry http://registry.npmmirror.com
RUN npm install
COPY . .
EXPOSE 3000