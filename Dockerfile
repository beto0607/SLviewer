FROM nginx:latest

WORKDIR /app

COPY ./dist .
