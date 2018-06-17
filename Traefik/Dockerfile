FROM traefik:1.6-alpine

COPY traefik.toml /etc/traefik/traefik.toml

# RUN mkdir -p /certs/
# RUN chmod 755 /certs/

RUN pwd
RUN ls -l


COPY certs/cellarstonehub.crt /etc/ssl/traefik/cellarstonehub.crt
COPY certs/cellarstonehub.key /etc/ssl/traefik/cellarstonehub.key

# RUN chmod 644 /etc/ssl/traefik/cellarstonehub.crt
# RUN chmod 600 /etc/ssl/traefik/cellarstonehub.key 


WORKDIR /etc/ssl/traefik

RUN pwd
RUN ls -l


WORKDIR /

RUN pwd
RUN ls -l



