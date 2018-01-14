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
          office_api: {
            sh 'docker build -t cellar.hub.module.office.api ./Modules/Office/Api'
          },
          office_meeting_rooms: {
            sh 'docker build -t cellar.hub.module.office.meetingrooms ./Modules/Office/MeetingRooms'
          },
          office_reception: {
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
            sh 'docker tag cellar.hub.core.admin cellarstone/cellar.hub.core.admin:0.0.1'
            sh 'docker push cellarstone/cellar.hub.core.admin:0.0.1'
          },
          api: {
            sh 'docker tag cellar.hub.core.api cellarstone/cellar.hub.core.api:0.0.1'
            sh 'docker push cellarstone/cellar.hub.core.api:0.0.1'
          },
          cdn: {
            sh 'docker tag cellar.hub.core.cdn cellarstone/cellar.hub.core.cdn:0.0.1'
            sh 'docker push cellarstone/cellar.hub.core.cdn:0.0.1'
          },
          web: {
            sh 'docker tag cellar.hub.core.web cellarstone/cellar.hub.core.web:0.0.1'
            sh 'docker push cellarstone/cellar.hub.core.web:0.0.1'
          },
          websockets: {
            sh 'docker tag cellar.hub.core.websockets cellarstone/cellar.hub.core.websockets:0.0.1'
            sh 'docker push cellarstone/cellar.hub.core.websockets:0.0.1'
          },
          workflow: {
            sh 'docker tag cellar.hub.core.workflow cellarstone/cellar.hub.core.workflow:0.0.1'
            sh 'docker push cellarstone/cellar.hub.core.workflow:0.0.1'
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
          office_api: {
            sh 'docker tag cellar.hub.module.office.api cellarstone/cellar.hub.module.office.api:0.0.1'
            sh 'docker push cellarstone/cellar.hub.module.office.api:0.0.1'
          },
          office_meeting_rooms: {
            sh 'docker tag cellar.hub.module.office.meetingrooms cellarstone/cellar.hub.module.office.meetingrooms:0.0.1'
            sh 'docker push cellarstone/cellar.hub.module.office.meetingrooms:0.0.1'
          },
          office_reception: {
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