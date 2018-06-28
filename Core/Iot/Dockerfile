# FROM golang
# ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Iot


# # Cellar websockets - get packages & build
# WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Iot/server.d

# # RUN mkdir /root/.ssh/
# # ADD ./ssh/id_rsa /root/.ssh/id_rsa
# # ADD ./ssh/id_rsa.pub /root/.ssh/id_rsa.pub

# RUN go get -u github.com/golang/dep/cmd/dep
# RUN dep ensure
# RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o cellarhubiot

# # helpers
# # RUN echo $GOPATH
# RUN pwd
# RUN ls -l


# # -----------------------
# # Stage 2
# # -----------------------
# FROM alpine:3.5
# COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Iot/server.d/cellarhubiot /app/cellarhubiot
# RUN chmod +x /app/cellarhubiot



# # helpers
# RUN ls -l  

# ENTRYPOINT /app/cellarhubiot



FROM golang

#set token based github private repository access
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Iot



# Cellar workflow test app - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Iot/server.d
RUN go get ./...
# RUN go-wrapper download
# RUN go-wrapper install
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o cellarhubiot  


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

COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Iot/server.d/ /app/


WORKDIR /app
# helpers
RUN ls -l  

ENTRYPOINT /app/cellarhubiot