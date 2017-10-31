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



# FROM golang:1.8

# prepare environment ----
# RUN echo "[url \"git@github.com:\"]\n\tinsteadOf = https://github.com/" >> /root/.gitconfig
# RUN mkdir /root/.ssh && echo "StrictHostKeyChecking no " > /root/.ssh/config

# RUN go get "gopkg.in/mgo.v2"

# RUN git config --global url."https://3b772d9ffbab825bf21215c5357205c704e4e87e:x-oauth-basic@github.com/".insteadOf "https://github.com/"

# RUN go-wrapper download 
# RUN go get "github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/core/abstraction"


# RUN git config --global url."git@github.com:".insteadOf "https://github.com/"



# ------------------------

# WORKDIR /go/src/app
# COPY . .

# ENV APP_ENV "production"


# RUN git config --global url."https://3b772d9ffbab825bf21215c5357205c704e4e87e:x-oauth-basic@github.com/".insteadOf "https://github.com/"

# RUN go env

# RUN go get "gopkg.in/mgo.v2"

# RUN go get -u -f github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/core/abstraction

#RUN go-wrapper download 


# RUN go-wrapper download   # "go get -d -v ./..."
# RUN go-wrapper install    # "go install -v ./..."
#RUN go build


#CMD ["go-wrapper", "run"] # ["app"]

# by this https://divan.github.io/posts/go_get_private/
# RUN git config --global url."git@github.com:".insteadOf "https://github.com/"



FROM golang:1.8

ADD . $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow
CMD cd $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow

CMD cd $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow/cmd/workflow1
RUN go-wrapper download 
RUN go-wrapper install

CMD cd $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow/src/abstraction
RUN go-wrapper download 
RUN go-wrapper install

CMD cd $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow/src/decision
RUN go-wrapper download 
RUN go-wrapper install

CMD cd $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow/src/human
RUN go-wrapper download 
RUN go-wrapper install

CMD cd $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow/src/others
RUN go-wrapper download 
RUN go-wrapper install

CMD cd $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow/src/send
RUN go-wrapper download 
RUN go-wrapper install

CMD cd $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow/src/workflow
RUN go-wrapper download 
RUN go-wrapper install



# CMD go get github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow/src/abstraction

CMD cd $GOPATH/github.com/cellarstone/Cellar.Hub/Cellar.Hub.WorkFlow/cmd/workflow1
RUN go build -o main . 
CMD ["/go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/workflow1/main"]

