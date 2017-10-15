docker rm --force @(docker ps -aq)
docker rmi --force @(docker images -aq)

docker-compose -f docker-compose.yml up --build


# Mosquitto - MQTT
docker build -t cellar.hub.mqtt .
docker run -d -p 1883:1883 -p 9001:9001 -t cellar.hub.mqtt

# RethinkDB
docker build -t cellar.hub.rethinkdb .
docker run -d -p 28015:28015 -p 29015:29015 -p 8080:8080 -t cellar.hub.rethinkdb

