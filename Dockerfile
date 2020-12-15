FROM node:14 as builder

ENV NODE_ENV=development
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn 


COPY . .
RUN yarn build

# ------------------------- #

FROM node:14 as production

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY --from=builder /usr/src/app/dist ./dist

CMD ["yarn", "start"]
