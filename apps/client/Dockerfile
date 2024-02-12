FROM node:20.11.0-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
# COPY . .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# FROM node:lts-alpine as builder

# WORKDIR /usr/src/app

# COPY . .

# RUN npm install

# RUN npm run build --scope=client

# FROM nginx:stable-alpine

# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
# RUN ls -al

# RUN rm /etc/nginx/conf.d/default.conf

# COPY deploy/nginx/nginx.conf /etc/nginx/conf.d

# EXPOSE 3000

# CMD ["nginx", "-g", "daemon off;"]