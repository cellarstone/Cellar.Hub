FROM postgres:latest
EXPOSE 5432
#COPY dbscripts/CREATE_DATABASE.sql /docker-entrypoint-initdb.d/CREATE_DATABASE.sql
#COPY dbscripts/catalog.sql /docker-entrypoint-initdb.d/catalog.sql

#RUN apt-get -y update  && \
	#apt-get -y install ssh

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# RUN chmod +x /usr/src/app/entrypoint.sh
# CMD /bin/bash ./entrypoint.sh