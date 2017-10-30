docker rm --force @(docker ps -aq)
docker rmi --force @(docker images -aq)

docker-compose -f docker-compose.yml up --build


# Mosquitto - MQTT
docker build -t cellar.hub.mqtt .
docker run -d -p 1883:1883 -t cellar.hub.mqtt

# RethinkDB
docker build -t cellar.hub.rethinkdb .
docker run -d -p 28015:28015 -p 29015:29015 -p 8080:8080 -t cellar.hub.rethinkdb

# MongoDB
docker build -t cellar.hub.mongodb .
docker run -d -p 27017:27017 -t cellar.hub.mongodb

# Workflow
docker build -t cellar.hub.workflow .
docker run -it cellar.hub.workflow

# DataFlow
$Env:ASPNETCORE_ENVIRONMENT = "Development"
dotnet restore
dotnet build 
dotnet run
