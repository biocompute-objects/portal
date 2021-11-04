FROM ubuntu:21.04
LABEL org.opencontainers.image.source https://github.com/biocompute-objects/portal
ENV DEBIAN_FRONTEND=noninteractive

EXPOSE 3000

RUN apt-get update && apt-get install -y nodejs npm vim

WORKDIR /portal

COPY src ./src
COPY package.json .
COPY jsconfig.json .
COPY public public
COPY docs docs

RUN npm install --legacy-peer-deps
#RUN npm audit fix --legacy-peer-deps

CMD ["npm", "run", "start"]