FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
