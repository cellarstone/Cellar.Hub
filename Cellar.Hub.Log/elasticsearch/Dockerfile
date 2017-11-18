FROM docker.elastic.co/elasticsearch/elasticsearch:5.6.3

# COPY --chown=elasticsearch:elasticsearch elasticsearch.yml /usr/share/elasticsearch/config/

RUN bin/elasticsearch-plugin install --batch x-pack
RUN echo "xpack.security.enabled: false" >> /usr/share/elasticsearch/config/elasticsearch.yml
RUN echo "http.cors.enabled: true" >> /usr/share/elasticsearch/config/elasticsearch.yml
RUN echo "http.cors.allow-origin: '*'" >> /usr/share/elasticsearch/config/elasticsearch.yml

EXPOSE 9200
EXPOSE 9300