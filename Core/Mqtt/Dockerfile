FROM toke/mosquitto
EXPOSE 1883 
EXPOSE 9001 

#RUN apt-get -y update

RUN ls -l

WORKDIR /etc/mosquitto

RUN ls -l

WORKDIR /mqtt/config

RUN ls -l

ADD mosquitto.conf /mqtt/config/mosquitto.conf
ADD mosquitto.conf /etc/mosquitto/mosquitto.conf


WORKDIR /

CMD ["mosquitto"]

