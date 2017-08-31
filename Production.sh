#sudo docker rm --force $(sudo docker ps -a -q)
#sudo docker rmi --force $(sudo docker images -a -q)

#sudo systemctl restart docker

#Docker_Hub_Network=$(sudo docker network ls --filter "name=cellarhub_default" --format "{{.ID}}")
#sudo docker network rm ${Docker_Hub_Network}

#ln -s ~/Dropbox/Cellar.Hub hubDropbox
cd Dropbox/Cellar.Hub

sudo docker-compose -f docker-compose.production.yml up