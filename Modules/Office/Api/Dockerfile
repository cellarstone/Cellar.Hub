FROM golang
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Modules/Office/Api



# Cellar websockets - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Modules/Office/Api
RUN go-wrapper download
RUN go-wrapper install
RUN go build -o moduleofficeapi  

# helpers
# RUN echo $GOPATH
RUN pwd
RUN ls -l


# -----------------------
# Stage 2
# -----------------------
FROM golang
 WORKDIR /app
 COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Modules/Office/Api/ /app/
 RUN ls -l  

CMD ["./moduleofficeapi"]


