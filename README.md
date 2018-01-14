

# Run

Run everything with these commands.

Linux : `docker-compone -f docker-compose.full.production.linux.yml`

Windows: `docker-compone -f docker-compose.full.production.windows.yml`


# Ports

Port | Application
--- | ---
8080 | Nginx
44401 | Core - Web
44402 | Core - Admin
44403 | Core - Api
44404 | Core - Cdn
44405 | Core - Workflow
44406 | Core - Websocket
27017 | Core - mongodb
1883 | Core - mqtt
24224 | Core - fluentd
9200 | Core - elastic
5601 | Core - kibana
9090 | Core - prometheus
9091 | Core - prometheus pushgateway
3000 | Core - grafana
19999 | sysmon - netdata
44511 | Office Module - Meeting rooms Web App
44512 | Office Module - Reception Web App
44513 | Office Module - Api



# Author notes

Inspect elasticsearch IP address

`docker inspect cellarhub_elasticsearch_1 | grep IPAddress`


# Commands for Linux

```Shell


# ----------------------------------
# DOCKER-COMPOSE
# ----------------------------------

# DEV --------------------------
sudo docker-compose -f docker-compose.full.development.linux.yml up --build

# PROD ------------------------
sudo docker-compose -f docker-compose.production.linux.yml up --build


# ----------------------------------
# STOP and DELETE Docker images
# ----------------------------------

sudo docker rm --force $(sudo docker ps -a -q)
sudo docker rmi --force $(sudo docker images -a -q)

# restart Docker
sudo systemctl restart docker

# Delete Docker Network
#Docker_Hub_Network=$(sudo docker network ls --filter "name=cellarhub_default" --format "{{.ID}}")
sudo docker network rm ${Docker_Hub_Network}


# SET ENVIRONMENT for aspnet core app
export ASPNETCORE_ENVIRONMENT="Development"

# ----------------------------------
# CORE
# ----------------------------------

# Web
sudo docker build -t cellar.hub.web .
sudo docker run -d -p 44401:44401 -t cellar.hub.web

# Admin
sudo docker build -t cellar.hub.admin .
sudo docker run -d -p 44402:44402 -t cellar.hub.admin

# API
sudo docker build -t cellar.hub.api .
sudo docker run -d -p 44403:44403 -t cellar.hub.api

# Cdn
sudo docker build -t cellar.hub.cdn .
sudo docker run -d -p 44404:44404 -t cellar.hub.cdn

# Workflow
sudo docker build -t cellar.hub.workflow .
sudo docker run -d -p 44405:44405 -t cellar.hub.workflow
sudo docker run -it cellar.hub.workflow

# Websockets
sudo docker build -t cellar.hub.websockets .
sudo docker run -d -p 44406:44406 -t cellar.hub.websockets
sudo docker run -it cellar.hub.websockets


# Mosquitto - MQTT
sudo docker build -t cellar.hub.mqtt .
sudo docker run -d -p 1883:1883 -p 9001:9001 -t cellar.hub.mqtt

# MongoDB
sudo docker build -t cellar.hub.mongodb .
sudo docker run -d -p 27017:27017 -t cellar.hub.mongodb


#Fluentd
#http://localhost:9880/myapp.access?json={"event":"data"}
sudo docker build -t cellar.hub.log.fluentd .
sudo docker run -d -p 9880:9880 -p 24224:24224 -t cellar.hub.log.fluentd

#Elasticsearch
#http://localhost:9200
# or http://localhost:9200/_count?pretty
# username : elastic
# password : changeme

sudo docker build -t cellar.hub.log.elasticsearch .
sudo docker run -d -p 9200:9200 -p 9300:9300 -t cellar.hub.log.elasticsearch

#Kibana
#http://localhost:5601
# username : kibana
# password : changeme
sudo docker build -t cellar.hub.log.kibana .
sudo docker run -d -p 5601:5601 -t cellar.hub.log.kibana

#Prometheus
#http://localhost:9090
sudo docker build -t cellar.hub.log.prometheus .
sudo docker run -d -p 9090:9090 -t cellar.hub.log.prometheus

#Grafana
#http://localhost:3000
# username : admin
# password : admin
sudo docker build -t cellar.hub.log.grafana .
sudo docker run -d -p 3000:3000 -t cellar.hub.log.grafana

# logging docker logs to fluentd
#docker run --log-driver=fluentd --log-opt fluentd-address=192.168.0.1:24224 IMAGE echo "Hello Fluentd"
# or specify logging with fluentd in docker-compose.yml

# ----------------------------------
# MODULES
# ----------------------------------

# Office - Api
sudo docker build -t cellar.hub.module.office.api .
sudo docker run -d -p 44513:44513 -t cellar.hub.module.office.api

# Office - MeetingRooms
sudo docker build -t cellar.hub.module.office.meetingrooms .
sudo docker run -d -p 44511:44511 -t cellar.hub.module.office.meetingrooms

# Office - Reception
sudo docker build -t cellar.hub.module.office.reception .
sudo docker run -d -p 44512:44512 -t cellar.hub.module.office.reception

```


# Commands for Windows

```Shell
docker rm --force @(docker ps -aq)
docker rmi --force @(docker images -aq)

# Mosquitto - MQTT
docker build -t cellar.hub.mqtt .
docker run -d -p 1883:1883 -p 9001:9001 -t cellar.hub.mqtt

# MongoDB
docker build -t cellar.hub.mongodb .
docker run -d -p 27017:27017 -t cellar.hub.mongodb

# Workflow
docker build -t cellar.hub.workflow .
docker run -it cellar.hub.workflow

# DEV
docker-compose -f docker-compose.full.development.windows.yml up --build

```