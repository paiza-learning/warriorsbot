FROM node:17 as production

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn", "start"]
