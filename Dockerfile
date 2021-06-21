FROM node:14

LABEL Plataform GestorMedicoNode

# variables
ENV APP_HOME /gestor-medico-node

RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}

ADD ./package.json ${APP_HOME}/
RUN npm install

COPY . ${APP_HOME}

EXPOSE 3000

CMD [ "npm", "dev" ]
