FROM node:16.8-alpine3.11 as builder
ENV NODE_ENV build
WORKDIR /project
COPY package.json /project
RUN npm config get registry
RUN npm config set registry http://registry.npmmirror.com
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm","start" ]