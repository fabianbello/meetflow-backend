FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./dist ./src

CMD ["node", "src/main.js"]