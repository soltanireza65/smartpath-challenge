FROM node:20.11.0-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
# COPY . .

RUN npm install
RUN npm run prisma:gen

COPY . .

CMD ["npm", "run", "dev"]