FROM node:18-alpine3.15
WORKDIR /project
COPY package.json ./project
RUN npm config get registry
RUN npm config set registry http://registry.npmmirror.com
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm","start" ]