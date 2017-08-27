# docker rm --force @(docker ps -aq)
# docker rmi --force @(docker images -aq)

docker-compose -f docker-compose.yml up --build
