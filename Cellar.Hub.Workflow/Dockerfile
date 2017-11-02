FROM golang AS builder

#set token based github private repository access
RUN git config --global url."https://3b772d9ffbab825bf21215c5357205c704e4e87e:x-oauth-basic@github.com/".insteadOf "https://github.com/"
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow


# Cellar workflow1 - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/workflow1
RUN go-wrapper download
RUN go-wrapper install
RUN CGO_ENABLED=0 GOOS=linux go build -o cellarworkf1 -a -installsuffix cgo  

RUN pwd
RUN ls -l

COPY /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/workflow1/cellarworkf1 /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/manager/binaries

# Cellar workflow manager - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/manager
RUN go-wrapper download
RUN go-wrapper install
RUN CGO_ENABLED=0 GOOS=linux go build -o cellarworkflowmanager -a -installsuffix cgo  



# helpers
# RUN echo $GOPATH
# RUN pwd
# RUN ls -l

# -----------------------
# Stage 2
# -----------------------
 FROM alpine:latest
 RUN apk --no-cache add ca-certificates
 WORKDIR /app
 COPY --from=builder /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/manager/ /app/
 RUN ls -l
#  CMD workflow1
#  ENTRYPOINT ./workflow1





CMD ["./cellarworkflowmanager"]
# CMD ["/go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/workflow1/workflow1"]
# CMD workflow1
