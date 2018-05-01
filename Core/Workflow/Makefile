all: generate

# clean:
# 	rm -rf /home/cellarstone/go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/

# copy:
# 	cp -R . /home/cellarstone/go/src/github.com/cellarstone/Cellar.Hub/Core/Workflow/


generate: 
	protoc -I pb/ pb/external/iot.proto --go_out=plugins=grpc:pb/external