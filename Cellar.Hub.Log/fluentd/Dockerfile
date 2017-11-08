# FROM fluent/fluentd:latest
# WORKDIR /home/fluent
# ENV PATH /home/fluent/.gem/ruby/2.2.0/bin:$PATH
# RUN gem install fluent-plugin-secure-forward
# RUN gem install fluent-plugin-elasticsearch 

# ENV FLUENTD_CONF fluent.conf
# ADD fluent.conf /fluentd/etc/

# WORKDIR /fluentd/etc
# RUN ls -l
# RUN echo $FLUENTD_CONF

# EXPOSE 24224
# CMD fluentd -c /fluentd/etc/$FLUENTD_CONF -p /fluentd/plugins $FLUENTD_OPT

FROM fluent/fluentd:v0.14
RUN ["gem", "install", "fluent-plugin-elasticsearch", "--no-rdoc", "--no-ri", "--version", "1.9.5"]
# RUN ["gem", "install", "fluent-plugin-concat", "--version", "2.1.0"] 
# RUN ["gem", "install", "fluent-plugin-detect-exceptions"]