FROM golang
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Websockets



# Cellar websockets - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Websockets
RUN go-wrapper download
RUN go-wrapper install
#RUN go build -o cellarwebsockets  
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o cellarwebsockets

# helpers
# RUN echo $GOPATH
RUN pwd
RUN ls -l


# -----------------------
# Stage 2
# -----------------------
# FROM golang
#  WORKDIR /app
#  COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Websockets/ /app/
#  RUN ls -l  

# CMD ["./cellarwebsockets"]


FROM alpine:3.5
COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Websockets/cellarwebsockets /app/cellarwebsockets
RUN chmod +x /app/cellarwebsockets

# helpers
RUN ls -l  

ENTRYPOINT /app/cellarwebsockets


