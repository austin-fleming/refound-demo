FROM node:17

# optimize for production
# ENV NODE_ENV production

WORKDIR /server-app

# Install packages first. If other files change, it won't have to reinstall.
COPY ./package.json .
# COPY ./yarn.lock .
RUN yarn install
# Copy everything
COPY . .
# build
RUN yarn monitor:build:production

# don't run as root
RUN chown -R node:node .
USER node

EXPOSE 80

CMD ["yarn", "monitor:serve:production"]