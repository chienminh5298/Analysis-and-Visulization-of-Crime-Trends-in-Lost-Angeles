FROM node:14 as build

WORKDIR /app

COPY . /app

RUN npm ci

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx","-g","daemon off;"]