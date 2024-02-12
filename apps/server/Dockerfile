FROM node:20.11.0-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
# COPY . .

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]