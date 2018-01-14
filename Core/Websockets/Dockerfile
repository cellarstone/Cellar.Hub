FROM golang
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Websockets



# Cellar websockets - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Websockets
RUN go-wrapper download
RUN go-wrapper install
RUN go build -o cellarwebsockets  

# helpers
# RUN echo $GOPATH
RUN pwd
RUN ls -l


# -----------------------
# Stage 2
# -----------------------
#  FROM alpine:latest
#  RUN apk --no-cache add ca-certificates
FROM golang
 WORKDIR /app
 COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Websockets/ /app/
 RUN ls -l  

CMD ["./cellarwebsockets"]


