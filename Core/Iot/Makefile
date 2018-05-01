all: generate

# clean:
# 	rm -rf /home/cellarstone/go/src/github.com/cellarstone/Cellar.Hub/Core/Iot/

# copy:
# 	cp -R . /home/cellarstone/go/src/github.com/cellarstone/Cellar.Hub/Core/Iot/

generate: 
	protoc -I pb/ pb/iot.proto --go_out=plugins=grpc:pb