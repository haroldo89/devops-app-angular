#!/bin/bash

set +xe

echo "****************************"
echo "****   STARTING NGINX   ****"
echo "****************************"


panic(){
    echo $@
    return 1
}


get_http_artifact(){
    pwd
    wget --quiet --user=${nexus_user} --password="${nexus_password}" ${ARTIFACT_URL}
    ls -ltrs
    unzip ${FILE_NAME_ARTIFACT}
}

deploy_downloaded_artifact(){
    if [ -d "${HOME}/html" ]
    then
        cp -R "${HOME}/html" "/usr/share/nginx/"
    else
        cp -R ${HOME}/* "/usr/share/nginx/html/."
    fi
}

env

mkdir -p $HOME && cd $HOME

get_http_artifact

deploy_downloaded_artifact

ls -la /usr/share/nginx/html/

nginx -g "daemon off;"