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
          traefik: {
            sh 'docker build -t cellar.hub.proxy ./Traefik'
          },
          admin: {
            sh 'docker build -t cellar.hub.core.admin ./Core/Admin'
          },
          api: {
            sh 'docker build -t cellar.hub.core.iot ./Core/Iot'
          },
          file: {
            sh 'docker build -t cellar.hub.core.file ./Core/File'
          },
          workflow: {
            sh 'docker build -t cellar.hub.core.workflow ./Core/Workflow'
          },
          websockets: {
            sh 'docker build -t cellar.hub.core.websockets ./Core/Websockets'
          },
          mongodb: {
            sh 'docker build -t cellar.hub.mongodb ./Core/Db/mongodb'
          },
          fluentd: {
            sh 'docker build -t cellar.hub.fluentd ./Core/Log/fluentd'
          },
          prometheus: {
            sh 'docker build -t cellar.hub.prometheus ./Core/Db/prometheus'
          },
          telegraf: {
            sh 'docker build -t cellar.hub.telegraf ./Core/Db/tickstack/telegraf'
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
          },
          office_cafe: {
            sh 'docker build -t cellar.hub.module.office.cafe ./Modules/Office/Cafe'
          },
          office_welcome: {
            sh 'docker build -t cellar.hub.module.office.welcome ./Modules/Office/Welcome'
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
          traefik: {
            sh 'docker tag cellar.hub.proxy cellarstone/cellar.hub.proxy:0.59.1'
            sh 'docker push cellarstone/cellar.hub.proxy:0.59.1'
          },
          admin: {
            sh 'docker tag cellar.hub.core.admin cellarstone/cellar.hub.core.admin:0.59.1'
            sh 'docker push cellarstone/cellar.hub.core.admin:0.59.1'
          },
          iot: {
            sh 'docker tag cellar.hub.core.iot cellarstone/cellar.hub.core.iot:0.59.1'
            sh 'docker push cellarstone/cellar.hub.core.iot:0.59.1'
          },
          file: {
            sh 'docker tag cellar.hub.core.file cellarstone/cellar.hub.core.file:0.59.1'
            sh 'docker push cellarstone/cellar.hub.core.file:0.59.1'
          },
          workflow: {
            sh 'docker tag cellar.hub.core.workflow cellarstone/cellar.hub.core.workflow:0.59.1'
            sh 'docker push cellarstone/cellar.hub.core.workflow:0.59.1'
          },
          websockets: {
            sh 'docker tag cellar.hub.core.websockets cellarstone/cellar.hub.core.websockets:0.59.1'
            sh 'docker push cellarstone/cellar.hub.core.websockets:0.59.1'
          },
          mongodb: {
            sh 'docker tag cellar.hub.mongodb cellarstone/cellar.hub.mongodb:0.59.1'
            sh 'docker push cellarstone/cellar.hub.mongodb:0.59.1'
          },
          fluentd: {
            sh 'docker tag cellar.hub.fluentd cellarstone/cellar.hub.fluentd:0.59.1'
            sh 'docker push cellarstone/cellar.hub.fluentd:0.59.1'
          },
          prometheus: {
            sh 'docker tag cellar.hub.prometheus cellarstone/cellar.hub.prometheus:0.59.1'
            sh 'docker push cellarstone/cellar.hub.prometheus:0.59.1'
          },
          telegraf: {
            sh 'docker tag cellar.hub.telegraf cellarstone/cellar.hub.telegraf:0.59.1'
            sh 'docker push cellarstone/cellar.hub.telegraf:0.59.1'
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
            sh 'docker tag cellar.hub.module.office.api cellarstone/cellar.hub.module.office.api:0.59.1'
            sh 'docker push cellarstone/cellar.hub.module.office.api:0.59.1'
          },
          office_meeting_rooms: {
            sh 'docker tag cellar.hub.module.office.meetingrooms cellarstone/cellar.hub.module.office.meetingrooms:0.59.1'
            sh 'docker push cellarstone/cellar.hub.module.office.meetingrooms:0.59.1'
          },
          office_reception: {
            sh 'docker tag cellar.hub.module.office.reception cellarstone/cellar.hub.module.office.reception:0.59.1'
            sh 'docker push cellarstone/cellar.hub.module.office.reception:0.59.1'
          },
          office_cafe: {
            sh 'docker tag cellar.hub.module.office.cafe cellarstone/cellar.hub.module.office.cafe:0.59.1'
            sh 'docker push cellarstone/cellar.hub.module.office.cafe:0.59.1'
          },
          office_welcome: {
            sh 'docker tag cellar.hub.module.office.welcome cellarstone/cellar.hub.module.office.welcome:0.59.1'
            sh 'docker push cellarstone/cellar.hub.module.office.welcome:0.59.1'
          }
        )
      }
    }
    stage('Google Storage') {
      when {
        branch 'master' 
      }
      steps {
         sh 'gsutil cp docker-stack.create.sh gs://cellarhub-dockerstack-files/'
         sh 'gsutil cp docker-stack.delete.sh gs://cellarhub-dockerstack-files/'
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