FROM golang

#set token based github private repository access
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow



# Cellar workflow test app - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/server.d
RUN go get ./...
# RUN go-wrapper download
# RUN go-wrapper install
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o cellarworkflowengine  


# helpers
RUN pwd
RUN ls -l


# -----------------------
# Stage 2
# -----------------------
FROM alpine:3.5
RUN apk add --no-cache procps
RUN apk add --no-cache bash
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/server.d/ /app/


WORKDIR /app
# helpers
RUN ls -l  

ENTRYPOINT /app/cellarworkflowengine