# -------------------------------------------------
# Stage 1
# -------------------------------------------------
FROM node:9-onbuild AS builder

# ANGULAR CLI ----
# USER root
# RUN npm install -g @angular/cli
# -----------

# YARN ----
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN apt-get update && apt-get install yarn
# ----------

RUN pwd
RUN ls -l



# BUILD APP and SERVER
RUN npm run-script myappbuild
# RUN npm run-script myserverbuild


# -------------------------------------------------
# Stage 2 
# -------------------------------------------------
FROM node:9-alpine

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
# COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
# COPY --from=builder /usr/src/app/server.js /usr/src/app/server.js

WORKDIR /usr/src/app

RUN pwd
RUN ls -l

# RUN npm install express
RUN npm install -g http-server

# RUN npm install --only=production

# RUN pwd
# RUN ls -l

# WORKDIR /usr/src/app/wwwroot

# RUN pwd
# RUN ls -l

# WORKDIR /usr/src/app

# RUN pwd
# RUN ls -l

# CMD node server.js
CMD http-server -c-1 -p 44511 dist/
