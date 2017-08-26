

docker build -f Cellar.Hub.Mqtt/Dockerfile -t cellar.hub.mqtt .
docker build -f Cellar.Hub.MongoDb/Dockerfile -t cellar.hub.mongodb .
docker build -f Cellar.Hub.RethinkDb/Dockerfile -t cellar.hub.rethinkdb .


docker run -d -p 1883:1883 -t cellar.hub.mqtt
docker run -d -p 27017:27017 -v /data/db1:/data/db -t cellar.hub.mongodb
docker run -d -p 28015:28015 -p 8080:8080 -v /data/db2:/data/db -t cellar.hub.rethinkdb

cd .\Cellar.Hub.DataFlow
dotnet restore

$Env:ASPNETCORE_ENVIRONMENT = "Development"

dotnet build
dotnet run