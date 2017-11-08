FROM golang

#set token based github private repository access
RUN git config --global url."https://3b772d9ffbab825bf21215c5357205c704e4e87e:x-oauth-basic@github.com/".insteadOf "https://github.com/"
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow


# Cellar workflow1 - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/workflow1
RUN go-wrapper download
RUN go-wrapper install
RUN go build -o bin/cellarworkf1 

# Cellar workflow2 - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/workflow2
RUN go-wrapper download
RUN go-wrapper install
RUN go build -o bin/cellarworkf2

# Cellar savetoprometheus - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/savetoprometheus
RUN go-wrapper download
RUN go-wrapper install
RUN go build -o bin/savetoprometheus


# Cellar workflow manager - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/manager
RUN go-wrapper download
RUN go-wrapper install
RUN go build -o cellarworkflowmanager  



# copy all workflow to manager
RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/workflow1/bin/cellarworkf1 /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/manager
RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/workflow2/bin/cellarworkf2 /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/manager
RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/savetoprometheus/bin/savetoprometheus /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/manager



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
 COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/manager/ /app/
 RUN ls -l  
#  CMD workflow1
#ENTRYPOINT ./cellarworkflowmanager



#CMD cellarworkflowmanager

CMD ["./cellarworkflowmanager"]
# CMD ["/go/src/github.com/cellarstone/Cellar.Hub/Cellar.Hub.Workflow/cmd/workflow1/workflow1"]
# CMD workflow1
