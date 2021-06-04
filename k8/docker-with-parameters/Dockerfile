FROM nginx:1.19.6

ENV APP_HOME=/etc/nginx
ENV HOME=/opt/app
ENV HELPER_SCRIPTS_HOME=/opt/paloit

RUN apt-get update && apt-get install -y zip wget ruby

RUN mkdir $HELPER_SCRIPTS_HOME

COPY scripts $HELPER_SCRIPTS_HOME
COPY conf.d/*.conf $APP_HOME/conf.d/

RUN chgrp -R 0 $HELPER_SCRIPTS_HOME && chgrp -R 0 $APP_HOME/conf.d/*.conf && \
chmod -R 755  $HELPER_SCRIPTS_HOME/start.sh 

EXPOSE 80

WORKDIR $HELPER_SCRIPTS_HOME

ENTRYPOINT ["./start.sh"]