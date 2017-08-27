sudo docker rm --force $(sudo docker ps -a -q)
sudo docker rmi --force $(sudo docker images -a -q)

ln -s ~/Dropbox/Cellar.Hub hubDropbox
cd Dropbox/Cellar.Hub

sudo docker-compose -f docker-compose.production.yml up