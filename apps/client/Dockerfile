FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run dev

# FROM node:lts-alpine as builder

# WORKDIR /app

# COPY . .

# RUN npm install

# RUN npm run build

# FROM nginx:stable-alpine

# COPY --from=builder /app/dist /usr/share/nginx/html
# RUN ls -al

# RUN rm /etc/nginx/conf.d/default.conf

# COPY deploy/nginx/nginx.conf /etc/nginx/conf.d

# EXPOSE 3000

# CMD ["nginx", "-g", "daemon off;"]