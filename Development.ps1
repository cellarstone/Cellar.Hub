docker rm --force @(docker ps -aq)
docker rmi --force @(docker images -aq)

docker-compose -f docker-compose.yml up --build


# Mosquitto - MQTT
docker build -t cellar.hub.mqtt .
docker run -d -p 1883:1883 -p 9001:9001 -t cellar.hub.mqtt

# MongoDB
docker build -t cellar.hub.mongodb .
docker run -d -p 27017:27017 -t cellar.hub.mongodb


# Workflow
docker build -t cellar.hub.workflow .
docker run -it cellar.hub.workflow



# docker-compose variants
docker-compose -f docker-compose.api.yml up --build
docker-compose -f docker-compose.workflow.yml up --build
docker-compose -f docker-compose.production.yml up --build