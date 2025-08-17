FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --include=optional

COPY . .

EXPOSE 1337

CMD ["npx", "strapi", "develop"]
