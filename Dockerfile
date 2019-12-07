ARG WORKDIR=/home/node/app/

# Stage 1: Copy files and install dependencies and build
FROM node:12.13.1-alpine as builder

ARG WORKDIR

WORKDIR ${WORKDIR}

COPY package*.json ${WORKDIR}

COPY . ${WORKDIR}

RUN npm run build

# Stage 2: Run linters and tests
FROM builder as tests

ARG WORKDIR

WORKDIR ${WORKDIR}

COPY --from=builder ${WORKDIR} .

RUN npm run lint && npm test

# Stage 3: Start app
FROM builder as app

ARG WORKDIR

ENV PORT 3000

WORKDIR ${WORKDIR}

COPY --from=builder ${WORKDIR}build/ .
COPY --from=builder ${WORKDIR}node_modules/ .
COPY --from=builder ${WORKDIR}package.json .
COPY --from=builder ${WORKDIR}package-lock.json .

RUN npm prune --production

EXPOSE $PORT

CMD npm start
