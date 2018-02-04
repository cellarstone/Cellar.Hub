FROM golang
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Api



# Cellar websockets - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Api/server.d
RUN go-wrapper download
RUN go-wrapper install
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o cellarhubapi

# helpers
# RUN echo $GOPATH
RUN pwd
RUN ls -l


# -----------------------
# Stage 2
# -----------------------
FROM alpine:3.5
COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Api/server.d/cellarhubapi /app/cellarhubapi
RUN chmod +x /app/cellarhubapi

# helpers
RUN ls -l  

ENTRYPOINT /app/cellarhubapi


