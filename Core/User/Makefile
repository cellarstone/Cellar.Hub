all: generate

# clean:
# 	rm -rf /home/cellarstone/go/src/github.com/cellarstone/Cellar.Hub/Core/User/

# copy:
# 	cp -R . /home/cellarstone/go/src/github.com/cellarstone/Cellar.Hub/Core/User/

generate: 
	protoc -I pb/ pb/user.proto --go_out=plugins=grpc:pb