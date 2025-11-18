FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY ../shared ./shared

EXPOSE 5000

CMD ["npm", "start"]
