# delivery-app

Приложение доставки с чатом, авторизацией, хранением картинок


ЗАПУСК


Запуск в режиме dev: docker-compose --env-file .env -f docker-compose.dev.yml up


Запуск в режиме prod: docker-compose --env-file .env up


РОУТЫ


POST /signup - регистрация
Пример запроса
{
  "email": "den@netology.ru",
  "password": "123",
  "name": "den",
  "contactPhone": "+7 123 456 78 90"
}


POST /signin - авторизация
Пример запроса
{
  "email": "ildar@netology.ru",
  "password": "123"
}


POST /advertisements - создать объявление
Отправлять form data
images - одна или несколько картинок
shortTitle - текст
description -текст


GET /advertisements - получить все активные объявления


GET /advertisements/:id - получить объявление по id (можно и удаленное)


DELETE /advertisements/:id - удалить объявление по id (по признаку isDeleted)


SOCKET IN getHistory - получить историю сообщений по user0, user1


SOCKET IN sendMessage - отправить сообщение по author, receiver, text


SOCKET OUT chatHistory - ответ на getHistory


SOCKET OUT newMessage - рассылка после sendMessage
