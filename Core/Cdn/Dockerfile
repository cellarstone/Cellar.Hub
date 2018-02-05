FROM golang
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Cdn


# Cellar websockets - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Cdn
RUN go-wrapper download
RUN go-wrapper install
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o cellarhubcdn

# helpers
# RUN echo $GOPATH
RUN pwd
RUN ls -l


# -----------------------
# Stage 2
# -----------------------
FROM alpine:3.5
COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Cdn/cellarhubcdn /app/cellarhubcdn
RUN chmod +x /app/cellarhubcdn

# helpers
RUN ls -l  

ENTRYPOINT /app/cellarhubcdn


