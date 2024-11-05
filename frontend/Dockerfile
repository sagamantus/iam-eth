FROM node:20.16-alpine

EXPOSE 3000

WORKDIR /app
COPY package.json /app

RUN npm install

COPY . /app

CMD ["yarn","dev"]