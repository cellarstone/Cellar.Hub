# Production

# Steps

1. Run Hub
 - Connect to the Wifi
 - Set Account and password
 THEN
 - hub will send informations (HW, IP address ... etc) to the cloud and pair this informations with account

2. Run Senzor
3. Connect into AP mode and fill 
    - Wifi SSID
    - Wifi password
    - Account name
    - Account password

4. Senzor GET Hub IP from Cloud
5. Senzor send data into Hub

# SSL - HTTPS

certificate generate by 

```Shell
sudo openssl req -x509 -nodes -days 1000 -newkey rsa:2048 -keyout cellarstonehub.key -out cellarstonehub.crt
```


## SSH into Hub

`ssh cellarstone@0.tcp.ngrok.io -p 16723`
write password


## Chrome disable SSL errors

Find on Linux where is Chrome

`whereis google-chrome`

Run Chrome in ignore certificate errors mode

`./google-chrome --ignore-certificate-errors`

OR

install certificate on device


## Routes

Application | Url
--- | ---
Hub Admin | http://admin.cellarstone.hub
Hub Iot | http://iot.cellarstone.hub/metrics
File server | http://file.cellarstone.hub
Websocket server | http://websockets.cellarstone.hub
Workflow Manager | http://workflow.cellarstone.hub
Office - meeting rooms | http://meetingrooms.cellarstone.hub
Office - reception | http://reception.cellarstone.hub
Office - welcome | http://welcome.cellarstone.hub
Office - api | http://officeapi.cellarstone.hub


## Optional for debugging production version

2. On target device can be set all address on local /etc/hosts DNS file

    So, open the file `sudo gedit /etc/hosts`

    Add, all Hub's addresses. You will find you local IP address by `ifconfig` command

    Example :
    ```Shell
    192.168.1.19   admin.cellarstone.hub
    192.168.1.19   iot.cellarstone.hub
    192.168.1.19   cdn.cellarstone.hub
    192.168.1.19   workflow.cellarstone.hub
    192.168.1.19   websockets.cellarstone.hub
    192.168.1.19   meetingrooms.cellarstone.hub
    192.168.1.19   reception.cellarstone.hub
    192.168.1.19   officeapi.cellarstone.hub
    ```

## Setup Unify DNS

`ssh Cellarstone@192.168.1.1`

write password

sudo vi /etc/hosts


## Run

Run everything with this command.

`./docker-stack.create.sh` for running

`./docker-stack.delete.sh` for stop and clean


DEPRECATED - don't use docker stack, because it doesn't support `mode=non-blocking` for logging fluentd driver

Linux : `docker stack deploy -c docker-stack.yml cellarhub --with-registry-auth`



## Warning


1. On target device must exist all folders necessary for apps :
    - /data/cellarstone.hub/core/file
    - /data/cellarstone.hub/core/mongodb
    - /data/cellarstone.hub/core/elasticsearch
    - /data/cellarstone.hub/core/prometheus
    - /data/cellarstone.hub/core/grafana
    - /data/cellarstone.hub/core/influxdb



# Development

Run everything with this command.

Linux : `docker-compose up` or `docker-compose up --build`

## Proxy

You can see every registered service with :

`http://localhost:8080` - in docker compose mode

`http://127.0.0.1:8080` - in docker swarm mode



## Ports

Port | Application
--- | ---
80 | Traefik proxy
44402 | Core - Admin
44403 | Core - Iot Microservice
44404 | Core - File Server
44405 | Core - Workflow Microservice
44406 | Core - Websocket Server
27017 | Core - mongodb
1883 | Core - mqtt
24224 | Core - fluentd
9200 | Core - elastic
5601 | Core - kibana
9090 | Core - prometheus
9091 | Core - prometheus pushgateway
3000 | Core - grafana
8086 | Core - infuxdb
8888 | Core - chronograf
8094 | Core - telegraf
9092 | Core - kapacitor
16686 | Core - Jaeger
19999 | Core - sysmon (netdata)
44511 | Office Module - Meeting rooms Web App
44512 | Office Module - Reception Web App
44513 | Office Module - Api
44514 | Office Module - Cafe Web App
44515 | Office Module - Welcome




## Commands for Linux

```Shell


# ----------------------------------
# DOCKER-STACK - PROD
# ----------------------------------

docker stack deploy -c docker-stack.yml cellarhub --with-registry-auth

watch -n1 docker services ps


# ----------------------------------
# DOCKER-COMPOSE - DEV
# ----------------------------------

sudo docker-compose -f docker-compose.yml up --build


# ----------------------------------
# CLEANING
# ----------------------------------
docker system prune

sudo docker rm --force $(sudo docker ps -a -q)
sudo docker rmi --force $(sudo docker images -a -q)
docker volume rm $(docker volume ls -qf dangling=true)
docker network rm $(docker network ls | grep "bridge" | awk '/ / { print $1 }')



# restart Docker
sudo systemctl restart docker

# Delete Docker Network
#Docker_Hub_Network=$(sudo docker network ls --filter "name=cellarhub_default" --format "{{.ID}}")
sudo docker network rm ${Docker_Hub_Network}


# ----------------------------------
# CORE
# ----------------------------------

# Proxy
sudo docker build -t cellar.hub.proxy .
sudo docker run -d -p 80:80 -p 8080:8080 -t cellar.hub.proxy

# Admin
sudo docker build -t cellar.hub.core.admin .
sudo docker run -d -p 44402:44402 -t cellar.hub.core.admin

# API
sudo docker build -t cellar.hub.core.api .
sudo docker run -d -p 44403:44403 -t cellar.hub.core.api

# Cdn
sudo docker build -t cellar.hub.core.cdn .
sudo docker run -d -p 44404:44404 -t cellar.hub.core.cdn

# Workflow
sudo docker build -t cellar.hub.core.workflow .
sudo docker run -d -p 44405:44405 -t cellar.hub.core.workflow
sudo docker run -it cellar.hub.core.workflow

# Websockets
sudo docker build -t cellar.hub.core.websockets .
sudo docker run -d -p 44406:44406 -t cellar.hub.core.websockets
sudo docker run -it cellar.hub.core.websockets


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


## Commands for Windows

```Shell
docker rm --force @(docker ps -aq)
docker rmi --force @(docker images -aq)

docker-compose -f docker-compose.windows.yml up

docker-compose -f docker-compose.windows.yml up --build

```



# ARM

OS Rasbian 

Etcher - https://etcher.io
Rasbian - https://www.raspberrypi.org/downloads/raspbian/
Docker on Rasbian - https://www.marksei.com/docker-on-raspberry-pi-raspbian/


