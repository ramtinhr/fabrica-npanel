FROM node:14.3 as builder

WORKDIR /app
COPY package*.json /app/

RUN yarn install
COPY ./ /app/
RUN yarn run build

# EXPOSE 4000
# CMD [ "yarn", "run", "start" ]

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
