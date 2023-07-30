FROM node:20-alpine as build-stage

WORKDIR /bits-clubs-frontend
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL


ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL


RUN npm run build

FROM nginx:1.25.1-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /bits-clubs-frontend/dist /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'

