

# Run

Run everything with these commands.

Linux : `docker-compone -f docker-compose.full.production.linux.yml`

Windows: `docker-compone -f docker-compose.full.production.windows.yml`


# Ports

Port | Application
--- | ---
44401 | Web
44402 | Admin
44403 | Api
44404 | Cdn
44405 | Workflow
44406 | Websocket
44511 | Office Module - Meeting rooms Web App
44512 | Office Module - Reception Web App
44513 | Office Module - Api
27017 | mongodb
1883 | mqtt
24224 | fluentd
9200 | elastic
5601 | kibana
9090 | prometheus
9091 | prometheus pushgateway
3000 | grafana
19999 | sysmon - netdata


# Author notes

Inspect elasticsearch IP address

`docker inspect cellarhub_elasticsearch_1 | grep IPAddress`

