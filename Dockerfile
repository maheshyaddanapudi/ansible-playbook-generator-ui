FROM nginx:alpine

RUN apk add --update nodejs npm 

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

COPY nginx.conf /etc/nginx/nginx.conf
RUN cp -R /app/dist/ansible-playbook-generator-ui/* /usr/share/nginx/html