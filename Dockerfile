FROM node:20.10-alpine

WORKDIR /delivery

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "prod"]

# Пример команды запуска
# docker run --name delivery -it -v /Users/ikuluev/Desktop/Нетология/delivery-app:/src -p 3000:3000 delivery:1.0.0

