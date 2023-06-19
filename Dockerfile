FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production=true

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/src/main/bootstrap.js" ]
