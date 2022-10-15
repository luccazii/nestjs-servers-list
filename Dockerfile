FROM node:14-alpine

USER node

WORKDIR /usr/src/app
COPY . /usr/src/app

USER root

RUN npm i -g npm@7.24.2
RUN npm install #RUN npm ci && npm cache clean --force #todo try to use this instead of npm install

RUN npm run build

USER node


# TODO: CHANGE LINE 7 TO RUN npm install --production
# TODO: Install development packages if NODE_ENV is set to "development"
#ARG NODE_ENV
#ENV NODE_ENV $NODE_ENV
#RUN if [ "$NODE_ENV" == "development" ]; then npm install ; fi