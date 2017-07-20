FROM toke/mosquitto
EXPOSE 1883 
EXPOSE 9001 

RUN apt-get -y update

ADD mosquitto.conf /etc/mosquitto/mosquitto.conf

CMD ["mosquitto"]

