pipeline {
  agent any
  
  stages {
    stage('Docker Hub login') {
      steps {
        sh 'docker login -u cellarstone -p Cllrs456IoT'
      }
    }
    stage('Development') {
      steps {
        parallel (
          dataflow: {
            sh 'docker build -t cellar.hub.dataflow -f Dockerfile_Cellar.Hub.DataFlow .'
            sh 'docker tag cellar.hub.dataflow cellarstone/cellar.hub.dataflow:dev.0.0.4'
            sh 'docker push cellarstone/cellar.hub.dataflow:dev.0.0.4'
          },
          websocket: {
            sh 'docker build -t cellar.hub.websockets ./Cellar.Hub.WebSockets'
            sh 'docker tag cellar.hub.websockets cellarstone/cellar.hub.websockets:dev.0.0.1'
            sh 'docker push cellarstone/cellar.hub.websockets:dev.0.0.1'
          },
          api: {
            sh 'docker build -t cellar.hub.api -f Dockerfile_Cellar.Hub.Api .'
            sh 'docker tag cellar.hub.api cellarstone/cellar.hub.api:dev.0.0.2'
            sh 'docker push cellarstone/cellar.hub.api:dev.0.0.2'
          },
          web: {
            sh 'docker build -t cellar.hub.web -f Dockerfile_Cellar.Hub.Web .'
            sh 'docker tag cellar.hub.web cellarstone/cellar.hub.web:dev.0.0.2'
            sh 'docker push cellarstone/cellar.hub.web:dev.0.0.2'
          },
          mongodb: {
            sh 'docker build -t cellar.hub.mongodb ./Cellar.Hub.MongoDb'
            sh 'docker tag cellar.hub.mongodb cellarstone/cellar.hub.mongodb:dev.0.0.2'
            sh 'docker push cellarstone/cellar.hub.mongodb:dev.0.0.2'
          },
          rethinkdb: {
            sh 'docker build -t cellar.hub.rethinkdb ./Cellar.Hub.RethinkDb'
            sh 'docker tag cellar.hub.rethinkdb cellarstone/cellar.hub.rethinkdb:dev.0.0.2'
            sh 'docker push cellarstone/cellar.hub.rethinkdb:dev.0.0.2'
          },
          mqtt: {
            sh 'docker build -t cellar.hub.mqtt ./Cellar.Hub.Mqtt'
            sh 'docker tag cellar.hub.mqtt cellarstone/cellar.hub.mqtt:dev.0.0.2'
            sh 'docker push cellarstone/cellar.hub.mqtt:dev.0.0.2'
          }
        )
      }
    }
    stage('Human Check - Production') {
      steps {
        input "Can I deploy to Production ?"
      }
    }
    stage('Production') {
      steps {
        parallel (
          dataflow: {
            sh 'docker build -t cellar.hub.dataflow -f Dockerfile_Cellar.Hub.DataFlow .'
            sh 'docker tag cellar.hub.dataflow cellarstone/cellar.hub.dataflow:prod.0.0.4'
            sh 'docker push cellarstone/cellar.hub.dataflow:prod.0.0.4'
          },
          websocket: {
            sh 'docker build -t cellar.hub.websockets ./Cellar.Hub.WebSockets'
            sh 'docker tag cellar.hub.websockets cellarstone/cellar.hub.websockets:prod.0.0.1'
            sh 'docker push cellarstone/cellar.hub.websockets:prod.0.0.1'
          },
          api: {
            sh 'docker build -t cellar.hub.api -f Dockerfile_Cellar.Hub.Api .'
            sh 'docker tag cellar.hub.api cellarstone/cellar.hub.api:prod.0.0.2'
            sh 'docker push cellarstone/cellar.hub.api:prod.0.0.2'
          },
          web: {
            sh 'docker build -t cellar.hub.web -f Dockerfile_Cellar.Hub.Web .'
            sh 'docker tag cellar.hub.web cellarstone/cellar.hub.web:prod.0.0.2'
            sh 'docker push cellarstone/cellar.hub.web:prod.0.0.2'
          },
          mongodb: {
            sh 'docker build -t cellar.hub.mongodb ./Cellar.Hub.MongoDb'
            sh 'docker tag cellar.hub.mongodb cellarstone/cellar.hub.mongodb:prod.0.0.2'
            sh 'docker push cellarstone/cellar.hub.mongodb:prod.0.0.2'
          },
          rethinkdb: {
            sh 'docker build -t cellar.hub.rethinkdb ./Cellar.Hub.RethinkDb'
            sh 'docker tag cellar.hub.rethinkdb cellarstone/cellar.hub.rethinkdb:prod.0.0.2'
            sh 'docker push cellarstone/cellar.hub.rethinkdb:prod.0.0.2'
          },
          mqtt: {
            sh 'docker build -t cellar.hub.mqtt ./Cellar.Hub.Mqtt'
            sh 'docker tag cellar.hub.mqtt cellarstone/cellar.hub.mqtt:prod.0.0.2'
            sh 'docker push cellarstone/cellar.hub.mqtt:prod.0.0.2'
          }
        )
      }
    }
  }
}