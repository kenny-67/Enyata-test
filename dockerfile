FROM node:14-alpine

WORKDIR /dist

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


CMD [ "sh", "scripts/start.sh" ]

