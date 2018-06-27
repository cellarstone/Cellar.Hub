FROM traefik:1.6-alpine

COPY traefik.toml /etc/traefik/traefik.toml

# RUN mkdir -p /certs/
# RUN chmod 755 /certs/

RUN pwd
RUN ls -l


COPY certs/cellarstonehub.crt /certs/cellarstonehub.crt
COPY certs/cellarstonehub.key /certs/cellarstonehub.key

# RUN chmod 644 /certs/cellarstonehub.crt
# RUN chmod 600 /certs/cellarstonehub.key 


WORKDIR /certs

RUN pwd
RUN ls -l


WORKDIR /

RUN pwd
RUN ls -l



