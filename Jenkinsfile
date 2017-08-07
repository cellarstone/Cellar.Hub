pipeline {
  agent any
  
  stages {
    
    stage('Development') {
      steps {
        parallel (
          dataflow: {
            sh 'dotnet restore ./Cellar.Hub.DataFlow'
            sh 'dotnet build ./Cellar.Hub.DataFlow --configuration Release'
            sh 'dotnet publish ./Cellar.Hub.DataFlow --configuration Release'
            
            sh 'docker build -t hubdataflow ./Cellar.Hub.DataFlow'
            sh 'docker tag hubdataflow eu.gcr.io/cellarstone-1488228226623/hubdataflow:dev.0.0.1'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubdataflow:dev.0.0.1'
          },
          api: {
            sh 'dotnet restore ./Cellar.Hub.Api'
            sh 'dotnet build ./Cellar.Hub.Api --configuration Release'
            sh 'dotnet publish ./Cellar.Hub.Api --configuration Release'
            
            sh 'docker build -t hubapi ./Cellar.Hub.Api'
            sh 'docker tag hubapi eu.gcr.io/cellarstone-1488228226623/hubapi:dev.0.0.1'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubapi:dev.0.0.1'
          },
          web: {
            sh 'dotnet restore ./Cellar.Hub.Web'
            sh 'dotnet build ./Cellar.Hub.Web --configuration Release'
            sh 'dotnet publish ./Cellar.Hub.Web --configuration Release'
            
            sh 'docker build -t hubweb ./Cellar.Hub.Web'
            sh 'docker tag hubweb eu.gcr.io/cellarstone-1488228226623/hubweb:dev.0.0.1'
            sh 'gcloud docker -- hubweb eu.gcr.io/cellarstone-1488228226623/hubweb:dev.0.0.1'
          },
          db: {
            sh 'docker build -t hubdb ./Cellar.Hub.Db'
            sh 'docker tag hubdb eu.gcr.io/cellarstone-1488228226623/hubdb:dev.0.0.1'
            sh 'gcloud docker -- hubdb eu.gcr.io/cellarstone-1488228226623/hubdb:dev.0.0.1'
          },
          mqtt: {
            sh 'docker build -t hubmqtt ./Cellar.Hub.Mqtt'
            sh 'docker tag hubmqtt eu.gcr.io/cellarstone-1488228226623/hubmqtt:dev.0.0.1'
            sh 'gcloud docker -- hubmqtt eu.gcr.io/cellarstone-1488228226623/hubmqtt:dev.0.0.1'
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
            sh 'dotnet restore ./Cellar.Hub.DataFlow'
            sh 'dotnet build ./Cellar.Hub.DataFlow --configuration Release'
            sh 'dotnet publish ./Cellar.Hub.DataFlow --configuration Release'
            
            sh 'docker build -t hubdataflow ./Cellar.Hub.DataFlow'
            sh 'docker tag hubdataflow eu.gcr.io/cellarstone-1488228226623/hubdataflow:prod.0.0.1'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubdataflow:prod.0.0.1'
          },
          api: {
            sh 'dotnet restore ./Cellar.Hub.Api'
            sh 'dotnet build ./Cellar.Hub.Api --configuration Release'
            sh 'dotnet publish ./Cellar.Hub.Api --configuration Release'
            
            sh 'docker build -t hubapi ./Cellar.Hub.Api'
            sh 'docker tag hubapi eu.gcr.io/cellarstone-1488228226623/hubapi:prod.0.0.1'
            sh 'gcloud docker -- push eu.gcr.io/cellarstone-1488228226623/hubapi:prod.0.0.1'
          },
          web: {
            sh 'dotnet restore ./Cellar.Hub.Web'
            sh 'dotnet build ./Cellar.Hub.Web --configuration Release'
            sh 'dotnet publish ./Cellar.Hub.Web --configuration Release'
            
            sh 'docker build -t hubweb ./Cellar.Hub.Web'
            sh 'docker tag hubweb eu.gcr.io/cellarstone-1488228226623/hubweb:prod.0.0.1'
            sh 'gcloud docker -- hubweb eu.gcr.io/cellarstone-1488228226623/hubweb:prod.0.0.1'
          },
          db: {
            sh 'docker build -t hubdb ./Cellar.Hub.Db'
            sh 'docker tag hubdb eu.gcr.io/cellarstone-1488228226623/hubdb:prod.0.0.1'
            sh 'gcloud docker -- hubdb eu.gcr.io/cellarstone-1488228226623/hubdb:prod.0.0.1'
          },
          mqtt: {
            sh 'docker build -t hubmqtt ./Cellar.Hub.Mqtt'
            sh 'docker tag hubmqtt eu.gcr.io/cellarstone-1488228226623/hubmqtt:prod.0.0.1'
            sh 'gcloud docker -- hubmqtt eu.gcr.io/cellarstone-1488228226623/hubmqtt:prod.0.0.1'
          }
        )
      }
    }
  }
}