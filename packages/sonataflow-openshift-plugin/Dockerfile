FROM node:10

COPY ./dist /opt/console-demo-plugin/static
COPY --chmod=755 ./http-server.sh /opt/console-demo-plugin/http-server.sh

LABEL io.k8s.display-name="SonataFlow OpenShift Plugin" \
      io.k8s.description="OpenShift Console plugin to bring SonataFlow functionalities to OCP." \
      io.openshift.tags="openshift" 

RUN npm i -g http-server

USER node

WORKDIR /opt/console-demo-plugin
ENTRYPOINT [ "./http-server.sh", "./static" ]
