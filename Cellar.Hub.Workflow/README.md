

# Architecture

## src

workflow
task

## cmd

concrete workflows

## manager

Web App for managing everything





# Commands

1. Build workflow programs

```Shell
go build -o manager/workflow1 cmd/workflow1
go build cmd/workflow2 -o manager/workflow2 
go build -o manager/savetoprometheus cmd/savetoprometheus
go build cmd/fluentd -o manager/fluentd
go build cmd/sendtowebsocket -o manager/sendtowebsocket
go build cmd/cancelmeeting -o manager/cancelmeeting  
```

2. Run with VSCode

Debug workflow/manager profile
