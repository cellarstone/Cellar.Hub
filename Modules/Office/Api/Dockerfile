FROM golang
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Modules/Office/Api



# Cellar websockets - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Modules/Office/Api/server.d

# RUN mkdir /root/.ssh/
# ADD ./ssh/id_rsa /root/.ssh/id_rsa
# ADD ./ssh/id_rsa.pub /root/.ssh/id_rsa.pub

RUN go get -u github.com/golang/dep/cmd/dep
RUN dep ensure
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o moduleofficeapi

# helpers
# RUN echo $GOPATH
RUN pwd
RUN ls -l


# -----------------------
# Stage 2
# -----------------------
# FROM golang
#  WORKDIR /app
#  COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Modules/Office/Api/ /app/
#  RUN ls -l  

# CMD ["./moduleofficeapi"]


FROM alpine:3.5
COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Modules/Office/Api/server.d/moduleofficeapi /app/moduleofficeapi
RUN chmod +x /app/moduleofficeapi

# helpers
RUN ls -l  

ENTRYPOINT /app/moduleofficeapi



