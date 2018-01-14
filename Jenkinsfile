pipeline {
  agent any
  
  stages {
    stage('Docker Hub login') {
      when {
        branch 'master' 
      }
      steps {
        sh 'docker login -u cellarstone -p Cllrs456IoT'
      }
    }
    stage('Build - Core') {
      when {
        branch 'master' 
      }
      steps {
        parallel (
          admin: {
            sh 'docker build -t cellar.hub.core.admin ./Core/Admin'
          },
          api: {
            sh 'docker build -t cellar.hub.core.api ./Core/Api'
          },
          cdn: {
            sh 'docker build -t cellar.hub.core.cdn ./Core/Cdn'
          },
          web: {
            sh 'docker build -t cellar.hub.core.web ./Core/Web'
          },
          websockets: {
            sh 'docker build -t cellar.hub.core.websockets ./Core/Websockets'
          },
          workflow: {
            sh 'docker build -t cellar.hub.core.workflow ./Core/Workflow'
          }
        )
      }
    }
    stage('Build - Modules') {
      when {
        branch 'master' 
      }
      steps {
        parallel (
          office-api: {
            sh 'docker build -t cellar.hub.module.office.api ./Modules/Office/Api'
          },
          office-meeting-rooms: {
            sh 'docker build -t cellar.hub.module.office.meetingrooms ./Modules/Office/MeetingRooms'
          },
          office-reception: {
            sh 'docker build -t cellar.hub.module.office.reception ./Modules/Office/Reception'
          }
        )
      }
    }
    stage('Publish - Core') {
      when {
        branch 'master' 
      }
      steps {
        parallel (
          admin: {
            sh 'docker tag cellar.hub.admin cellarstone/cellar.hub.admin:0.0.1'
            sh 'docker push cellarstone/cellar.hub.admin:0.0.1'
          },
          api: {
            sh 'docker tag cellar.hub.api cellarstone/cellar.hub.api:0.0.1'
            sh 'docker push cellarstone/cellar.hub.api:0.0.1'
          },
          cdn: {
            sh 'docker tag cellar.hub.cdn cellarstone/cellar.hub.cdn:0.0.1'
            sh 'docker push cellarstone/cellar.hub.cdn:0.0.1'
          },
          web: {
            sh 'docker tag cellar.hub.web cellarstone/cellar.hub.web:0.0.1'
            sh 'docker push cellarstone/cellar.hub.web:0.0.1'
          },
          websockets: {
            sh 'docker tag cellar.hub.websockets cellarstone/cellar.hub.websockets:0.0.1'
            sh 'docker push cellarstone/cellar.hub.websockets:0.0.1'
          },
          workflow: {
            sh 'docker tag cellar.hub.workflow cellarstone/cellar.hub.workflow:0.0.1'
            sh 'docker push cellarstone/cellar.hub.workflow:0.0.1'
          }
        )
      }
    }
    stage('Publish - Modules') {
      when {
        branch 'master' 
      }
      steps {
        parallel (
          office-api: {
            sh 'docker tag cellar.hub.module.office.api cellarstone/cellar.hub.module.office.api:0.0.1'
            sh 'docker push cellarstone/cellar.hub.module.office.api:0.0.1'
          },
          office-meeting-rooms: {
            sh 'docker tag cellar.hub.module.office.meetingrooms cellarstone/cellar.hub.module.office.meetingrooms:0.0.1'
            sh 'docker push cellarstone/cellar.hub.module.office.meetingrooms:0.0.1'
          },
          office-reception: {
            sh 'docker tag cellar.hub.module.office.reception cellarstone/cellar.hub.module.office.reception:0.0.1'
            sh 'docker push cellarstone/cellar.hub.module.office.reception:0.0.1'
          }
        )
      }
    }
    // stage('Human Check - Publish files to Dropbox') {
    //   steps {
    //     input "Can I ?"
    //   }
    // }
    // stage('Hub dropbox') {
    //   steps {
    //      dropbox cleanRemote: true, configName: 'cellarstone', remoteDirectory: '', removePrefix: '', sourceFiles: 'docker-compose.full.production.linux.yml'
    //      dropbox cleanRemote: false, configName: 'cellarstone', remoteDirectory: '', removePrefix: '', sourceFiles: 'Production.sh'
    //   }
    // }
  }
}