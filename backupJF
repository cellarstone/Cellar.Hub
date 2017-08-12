pipeline {
  agent any
  
  stages {
    
    stage('Development') {
      steps {
        parallel (
          dataflow: {
            sh 'docker build -t hubdataflow -f Dockerfile_Cellar.Hub.DataFlow .'
            sh 'docker tag hubdataflow eu.gcr.io/cellarstone-1488228226623/hubdataflow:dev.0.0.3'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubdataflow:dev.0.0.3'
          },
          api: {
            sh 'docker build -t hubapi -f Dockerfile_Cellar.Hub.Api .'
            sh 'docker tag hubapi eu.gcr.io/cellarstone-1488228226623/hubapi:dev.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubapi:dev.0.0.2'
          },
          web: {
            sh 'docker build -t hubweb -f Dockerfile_Cellar.Hub.Web .'
            sh 'docker tag hubweb eu.gcr.io/cellarstone-1488228226623/hubweb:dev.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubweb:dev.0.0.2'
          },
          mongodb: {
            sh 'docker build -t hubmongodb ./Cellar.Hub.MongoDb'
            sh 'docker tag hubmongodb eu.gcr.io/cellarstone-1488228226623/hubmongodb:dev.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubmongodb:dev.0.0.2'
          },
          rethinkdb: {
            sh 'docker build -t rethinkdb ./Cellar.Hub.RethinkDb'
            sh 'docker tag rethinkdb eu.gcr.io/cellarstone-1488228226623/rethinkdb:dev.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/rethinkdb:dev.0.0.2'
          },
          mqtt: {
            sh 'docker build -t hubmqtt ./Cellar.Hub.Mqtt'
            sh 'docker tag hubmqtt eu.gcr.io/cellarstone-1488228226623/hubmqtt:dev.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubmqtt:dev.0.0.2'
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
            sh 'docker build -t hubdataflow -f Dockerfile_Cellar.Hub.DataFlow .'
            sh 'docker tag hubdataflow eu.gcr.io/cellarstone-1488228226623/hubdataflow:prod.0.0.3'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubdataflow:prod.0.0.3'
          },
          api: {
            sh 'docker build -t hubapi -f Dockerfile_Cellar.Hub.Api .'
            sh 'docker tag hubapi eu.gcr.io/cellarstone-1488228226623/hubapi:prod.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubapi:prod.0.0.2'
          },
          web: {
            sh 'docker build -t hubweb -f Dockerfile_Cellar.Hub.Web .'
            sh 'docker tag hubweb eu.gcr.io/cellarstone-1488228226623/hubweb:prod.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubweb:prod.0.0.2'
          },
          mongodb: {
            sh 'docker build -t hubmongodb ./Cellar.Hub.MongoDb'
            sh 'docker tag hubmongodb eu.gcr.io/cellarstone-1488228226623/hubmongodb:prod.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubmongodb:prod.0.0.2'
          },
          rethinkdb: {
            sh 'docker build -t rethinkdb ./Cellar.Hub.RethinkDb'
            sh 'docker tag rethinkdb eu.gcr.io/cellarstone-1488228226623/rethinkdb:prod.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/rethinkdb:prod.0.0.2'
          },
          mqtt: {
            sh 'docker build -t hubmqtt ./Cellar.Hub.Mqtt'
            sh 'docker tag hubmqtt eu.gcr.io/cellarstone-1488228226623/hubmqtt:prod.0.0.2'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubmqtt:prod.0.0.2'
          }
        )
      }
    }
  }
}