FROM ubuntu:latest
LABEL authors="S1ither"
LABEL version="1.0.0"

FROM node:20.14.0 as build

WORKDIR /home/cyber

COPY src ./src
COPY package.json .
COPY yarn.yml .
COPY yarn.lock .
COPY pnp.cjs .
COPY tsconfig.json .

RUN yarn install
WORKDIR $APP_HOME
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/build/libs/$ARTIFACT_NAME .

ENTRYPOINT ["/home/cyber/init.bash"]