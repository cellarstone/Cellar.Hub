FROM golang

#set token based github private repository access
RUN git config --global url."https://3b772d9ffbab825bf21215c5357205c704e4e87e:x-oauth-basic@github.com/".insteadOf "https://github.com/"
ADD . $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow


# Cellar workflow1 - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/workflow1
RUN go-wrapper download
RUN go-wrapper install
#RUN go build -o bin/workflow1 
RUN GOOS=linux GOARCH=amd64 go build -o bin/workflow1 

# Cellar workflow2 - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/workflow2
RUN go-wrapper download
RUN go-wrapper install
#RUN go build -o bin/workflow2
RUN GOOS=linux GOARCH=amd64 go build -o bin/workflow2

# Cellar savetoprometheus - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/savetoprometheus
RUN go-wrapper download
RUN go-wrapper install
#RUN go build -o bin/savetoprometheus
RUN GOOS=linux GOARCH=amd64 go build -o bin/savetoprometheus 

# Cellar sendtowebsocket - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/sendtowebsocket
RUN go-wrapper download
RUN go-wrapper install
#RUN go build -o bin/sendtowebsocket
RUN GOOS=linux GOARCH=amd64 go build -o bin/sendtowebsocket

# Cellar savetofluentd - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/savetofluentd
RUN go-wrapper download
RUN go-wrapper install
#RUN go build -o bin/savetofluentd
RUN GOOS=linux GOARCH=amd64 go build -o bin/savetofluentd

# Cellar cancelmeeting - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/cancelmeeting
RUN go-wrapper download
RUN go-wrapper install
#RUN go build -o bin/cancelmeeting
RUN GOOS=linux GOARCH=amd64 go build -o bin/cancelmeeting


# Cellar workflow manager - get packages & build
WORKDIR $GOPATH/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager
RUN go-wrapper download
RUN go-wrapper install
#RUN go build -o cellarworkflowmanager
RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o cellarworkflowmanager  



# copy all workflow to manager
RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/workflow1/bin/workflow1 /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager
RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/workflow2/bin/workflow2 /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager
RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/savetoprometheus/bin/savetoprometheus /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager
RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/sendtowebsocket/bin/sendtowebsocket /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager
RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/savetofluentd/bin/savetofluentd /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager
RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/cmd/cancelmeeting/bin/cancelmeeting /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager


# copy : Wait-for-it script
# RUN cp /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/wait-for-it.sh /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager


# helpers
# RUN echo $GOPATH
RUN pwd
RUN ls -l


# -----------------------
# Stage 2
# -----------------------
# FROM golang
#  WORKDIR /app
#  COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager/ /app/
#  RUN ls -l  

# CMD ["./cellarworkflowmanager"]



FROM alpine:3.5
RUN apk add --no-cache procps
RUN apk add --no-cache bash
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

COPY --from=0 /go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/manager/ /app/


WORKDIR /app
# helpers
RUN ls -l  

# RUN chmod 755 ./workflow1
# RUN chmod 755 ./workflow2
# RUN chmod 755 ./savetoprometheus
# RUN chmod 755 ./sendtowebsocket
# RUN chmod 755 ./savetofluentd
# RUN chmod 755 ./cancelmeeting
# RUN chmod 755 ./cellarworkflowmanager

# RUN chmod +x /app/workflow1
# RUN chmod +x /app/workflow2
# RUN chmod +x /app/savetoprometheus
# RUN chmod +x /app/sendtowebsocket
# RUN chmod +x /app/savetofluentd
# RUN chmod +x /app/cancelmeeting
# RUN chmod +x /app/cellarworkflowmanager

# helpers
# RUN ls -l  


ENTRYPOINT /app/cellarworkflowmanager
