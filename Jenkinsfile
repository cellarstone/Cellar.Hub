pipeline {
  agent any
  
  stages {
    stage('Development') {
      steps {
        sh 'docker login -u cellarstone -p Cllrs456IoT'
      }
    }
    stage('Development') {
      steps {
        parallel (
          dataflow: {
            sh 'docker build -t hubdataflow -f Dockerfile_Cellar.Hub.DataFlow .'
            sh 'docker tag hubdataflow cellarstone/hubdataflow:dev.0.0.3'
            sh 'docker push cellarstone/hubdataflow:dev.0.0.3'
          },
          api: {
            sh 'docker build -t hubapi -f Dockerfile_Cellar.Hub.Api .'
            sh 'docker tag hubapi cellarstone/hubapi:dev.0.0.2'
            sh 'docker push cellarstone/hubapi:dev.0.0.2'
          },
          web: {
            sh 'docker build -t hubweb -f Dockerfile_Cellar.Hub.Web .'
            sh 'docker tag hubweb cellarstone/hubweb:dev.0.0.2'
            sh 'docker push cellarstone/hubweb:dev.0.0.2'
          },
          mongodb: {
            sh 'docker build -t hubmongodb ./Cellar.Hub.MongoDb'
            sh 'docker tag hubmongodb cellarstone/hubmongodb:dev.0.0.2'
            sh 'docker push cellarstone/hubmongodb:dev.0.0.2'
          },
          rethinkdb: {
            sh 'docker build -t rethinkdb ./Cellar.Hub.RethinkDb'
            sh 'docker tag rethinkdb cellarstone/rethinkdb:dev.0.0.2'
            sh 'docker push cellarstone/rethinkdb:dev.0.0.2'
          },
          mqtt: {
            sh 'docker build -t hubmqtt ./Cellar.Hub.Mqtt'
            sh 'docker tag hubmqtt cellarstone/hubmqtt:dev.0.0.2'
            sh 'docker push cellarstone/hubmqtt:dev.0.0.2'
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
            sh 'docker tag hubdataflow cellarstone/hubdataflow:prod.0.0.3'
            sh 'docker push cellarstone/hubdataflow:prod.0.0.3'
          },
          api: {
            sh 'docker build -t hubapi -f Dockerfile_Cellar.Hub.Api .'
            sh 'docker tag hubapi cellarstone/hubapi:prod.0.0.2'
            sh 'docker push cellarstone/hubapi:prod.0.0.2'
          },
          web: {
            sh 'docker build -t hubweb -f Dockerfile_Cellar.Hub.Web .'
            sh 'docker tag hubweb cellarstone/hubweb:prod.0.0.2'
            sh 'docker push cellarstone/hubweb:prod.0.0.2'
          },
          mongodb: {
            sh 'docker build -t hubmongodb ./Cellar.Hub.MongoDb'
            sh 'docker tag hubmongodb cellarstone/hubmongodb:prod.0.0.2'
            sh 'docker push cellarstone/hubmongodb:prod.0.0.2'
          },
          rethinkdb: {
            sh 'docker build -t rethinkdb ./Cellar.Hub.RethinkDb'
            sh 'docker tag rethinkdb cellarstone/rethinkdb:prod.0.0.2'
            sh 'docker push cellarstone/rethinkdb:prod.0.0.2'
          },
          mqtt: {
            sh 'docker build -t hubmqtt ./Cellar.Hub.Mqtt'
            sh 'docker tag hubmqtt cellarstone/hubmqtt:prod.0.0.2'
            sh 'docker push cellarstone/hubmqtt:prod.0.0.2'
          }
        )
      }
    }
  }
}