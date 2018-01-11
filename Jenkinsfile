pipeline {
  agent any
  
  stages {
    stage('Docker Hub login') {
      steps {
        sh 'docker login -u cellarstone -p Cllrs456IoT'
      }
    }
    stage('Production') {
      steps {
        parallel (
          admin: {
            sh 'docker build -t cellar.hub.admin ./Hub/Cellar.Hub.Admin'
            sh 'docker tag cellar.hub.admin cellarstone/cellar.hub.admin:0.0.1'
            sh 'docker push cellarstone/cellar.hub.admin:0.0.1'
          },
          api: {
            sh 'docker build -t cellar.hub.api ./Hub/Cellar.Hub.Api'
            sh 'docker tag cellar.hub.api cellarstone/cellar.hub.api:0.0.1'
            sh 'docker push cellarstone/cellar.hub.api:0.0.1'
          },
          cdn: {
            sh 'docker build -t cellar.hub.cdn ./Hub/Cellar.Hub.Cdn'
            sh 'docker tag cellar.hub.websockets cellarstone/cellar.hub.cdn:0.0.1'
            sh 'docker push cellarstone/cellar.hub.cdn:0.0.1'
          },
          web: {
            sh 'docker build -t cellar.hub.web ./Hub/Cellar.Hub.Web'
            sh 'docker tag cellar.hub.web cellarstone/cellar.hub.web:0.0.1'
            sh 'docker push cellarstone/cellar.hub.web:0.0.1'
          },
          websockets: {
            sh 'docker build -t cellar.hub.websockets ./Hub/Cellar.Hub.Websockets'
            sh 'docker tag cellar.hub.websockets cellarstone/cellar.hub.websockets:0.0.1'
            sh 'docker push cellarstone/cellar.hub.websockets:prod.0.0.1'
          },
          workflow: {
            sh 'docker build -t cellar.hub.workflow ./Hub/Cellar.Hub.Workflow'
            sh 'docker tag cellar.hub.workflow cellarstone/cellar.hub.workflow:0.0.1'
            sh 'docker push cellarstone/cellar.hub.workflow:0.0.1'
          }
        )
      }
    }
    stage('Human Check - Publish files to Dropbox') {
      steps {
        input "Can I ?"
      }
    }
    stage('Hub dropbox') {
      steps {
         dropbox cleanRemote: true, configName: 'cellarstone', remoteDirectory: '', removePrefix: '', sourceFiles: 'docker-compose.full.production.linux.yml'
         dropbox cleanRemote: false, configName: 'cellarstone', remoteDirectory: '', removePrefix: '', sourceFiles: 'Production.sh'
      }
    }
  }
}