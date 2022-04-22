# FROM node:17.8.0-alpine3.14 as builder
# WORKDIR /app

# COPY . ./
# RUN yarn install && yarn cache clean
# RUN yarn build

# WORKDIR /app/dist

# FROM node:17.8.0-alpine3.14

# COPY --from=builder /app/dist/ /react-d3-starter-kit/
# COPY package.json yarn.lock /react-d3-starter-kit/
# RUN chmod -R 777 /react-d3-starter-kit/
# RUN cd /react-d3-starter-kit/ && yarn install --production && yarn cache clean

# EXPOSE 8000
# ENTRYPOINT cd /react-d3-starter-kit/ && node .

FROM node:17.8.0-alpine3.14
WORKDIR /app
COPY . ./
# WORKDIR /dist
# COPY ./dist /app/dist
# CMD ls
WORKDIR /app/dist
RUN ls

ENTRYPOINT node .