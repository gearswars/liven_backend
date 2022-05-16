FROM node:16.15-slim AS build

# DATABASE
ENV TYPE=mysql
ENV HOST=localhost
ENV PORT=3306
ENV LOGIN=root
ENV PASSWORD=root
ENV DATABASE=liven_test
# JWT
ENV SECRET=BAFE1267A75E8

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY webpack.config.js /app
COPY tsconfig.json /app
COPY swagger.json /app
COPY src /app/src
COPY tests /app/tests

RUN yarn install

RUN yarn run build

CMD ["yarn", "run", "test"]

FROM node:16.15-slim AS app

WORKDIR /app

RUN ls

COPY --from=build /app/build .
COPY --from=build /app/package.json /app
COPY --from=build /app/yarn.lock /app

RUN ls

RUN yarn install --production

EXPOSE 3000

CMD ["node", "index.js"]