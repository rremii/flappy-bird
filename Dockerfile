FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json  ./

RUN yarn

COPY . .

EXPOSE 5000/tcp

CMD [ "node", "index.js" ]