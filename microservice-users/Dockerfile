FROM node

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY ./dist ./src

CMD ["node", "src/main.js"]