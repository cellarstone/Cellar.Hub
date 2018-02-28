all: clean copy

clean:
	rm -rf /home/cellarstone/go/src/github.com/cellarstone/Cellar.Hub/Core/Api/

copy:
	cp -R . /home/cellarstone/go/src/github.com/cellarstone/Cellar.Hub/Core/Api/

generate: 
	protoc -I pb/ pb/iot.proto --go_out=plugins=grpc:pb