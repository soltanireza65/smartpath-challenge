FROM node:20.11.0-alpine As development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]