FROM nginx:alpine

COPY ./src/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#FROM openjdk:17-jk
#WORKDIR /app
#COPY target/springdem-1.0.0.jar /app/srpingdemo.jar
#COPY *.html /app/
#EXPOSE 8080
#CMD["java","jar","srpingdemo.jar"]