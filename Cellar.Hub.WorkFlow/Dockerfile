# FROM golang:latest AS builder
# WORKDIR /go/src/github.com/cellarstone


# ENV APP_ENV "production"

# COPY . .


# RUN go get .

# RUN ls -l

# RUN set GOOS=linux
# RUN go build -o app .

# RUN ls -l



# FROM alpine:latest
# RUN apk --no-cache add ca-certificates

# ENV APP_ENV "production"
# WORKDIR /root

# COPY --from=builder /go/src/github.com/cellarstone/app .

# RUN ls
# # RUN cd /root
# # RUN ls
# # CMD ["ls -l"]
# # CMD ["cd root"]
# RUN pwd

# # ENTRYPOINT ["/root/app"]
# RUN go run main.go client.go


# EXPOSE 4000



FROM golang:1.8

WORKDIR /go/src/app
COPY . .

ENV APP_ENV "production"

RUN go-wrapper download   # "go get -d -v ./..."
RUN go-wrapper install    # "go install -v ./..."
RUN go build

CMD ["go-wrapper", "run"] # ["app"]
