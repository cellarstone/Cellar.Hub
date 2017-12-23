#sudo docker rm --force $(sudo docker ps -a -q)
#sudo docker rmi --force $(sudo docker images -a -q)

#sudo systemctl restart docker

#Docker_Hub_Network=$(sudo docker network ls --filter "name=cellarhub_default" --format "{{.ID}}")
#sudo docker network rm ${Docker_Hub_Network}

#ln -s ~/Dropbox/Cellar.Hub hubDropbox
#cd Dropbox/Cellar.Hub


# SET ENVIRONMENT
export ASPNETCORE_ENVIRONMENT="Development"



# API
sudo docker build -t cellar.hub.api .
sudo docker run -d -p 44403:44403 -t cellar.hub.api

# Cdn
sudo docker build -t cellar.hub.cdn .
sudo docker run -d -p 44404:44404 -t cellar.hub.cdn


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


# Workflow
sudo docker build -t cellar.hub.workflow .
sudo docker run -d -p 44405:44405 -t cellar.hub.workflow
sudo docker run -it cellar.hub.workflow

# Websockets
sudo docker build -t cellar.hub.websockets .
sudo docker run -d -p 44406:44406 -t cellar.hub.websockets
sudo docker run -it cellar.hub.websockets

# docker-compose variants
sudo docker-compose -f docker-compose.api.linux.yml up --build
sudo docker-compose -f docker-compose.workflow.linux.yml up --build

# DEV
sudo docker-compose -f docker-compose.full.development.linux.yml up --build

# PROD
sudo docker-compose -f docker-compose.production.yml up --build