FROM golang
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/File


# Cellar websockets - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/File
RUN go get ./...
# RUN go-wrapper download
# RUN go-wrapper install
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o cellarhubfile

# helpers
# RUN echo $GOPATH
RUN pwd
RUN ls -l


# -----------------------
# Stage 2
# -----------------------
FROM alpine:3.5
COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/File/cellarhubfile /app/cellarhubfile
RUN chmod +x /app/cellarhubfile

WORKDIR /app
RUN mkdir data

# helpers
RUN ls -l  

WORKDIR /

# helpers
RUN ls -l  


ENTRYPOINT /app/cellarhubfile


