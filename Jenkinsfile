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
          web: {
            sh 'docker build -t cellar.hub.core.web ./Core/Web'
          },
          admin: {
            sh 'docker build -t cellar.hub.core.admin ./Core/Admin'
          },
          api: {
            sh 'docker build -t cellar.hub.core.api ./Core/Api'
          },
          cdn: {
            sh 'docker build -t cellar.hub.core.cdn ./Core/Cdn'
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
          mqtt: {
            sh 'docker build -t cellar.hub.mqtt ./Core/Mqtt'
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
            sh 'docker tag cellar.hub.proxy cellarstone/cellar.hub.proxy:0.1.0'
            sh 'docker push cellarstone/cellar.hub.proxy:0.1.0'
          },
          web: {
            sh 'docker tag cellar.hub.core.web cellarstone/cellar.hub.core.web:0.1.0'
            sh 'docker push cellarstone/cellar.hub.core.web:0.1.0'
          },
          admin: {
            sh 'docker tag cellar.hub.core.admin cellarstone/cellar.hub.core.admin:0.1.0'
            sh 'docker push cellarstone/cellar.hub.core.admin:0.1.0'
          },
          api: {
            sh 'docker tag cellar.hub.core.api cellarstone/cellar.hub.core.api:0.1.0'
            sh 'docker push cellarstone/cellar.hub.core.api:0.1.0'
          },
          cdn: {
            sh 'docker tag cellar.hub.core.cdn cellarstone/cellar.hub.core.cdn:0.1.0'
            sh 'docker push cellarstone/cellar.hub.core.cdn:0.1.0'
          },
          workflow: {
            sh 'docker tag cellar.hub.core.workflow cellarstone/cellar.hub.core.workflow:0.1.0'
            sh 'docker push cellarstone/cellar.hub.core.workflow:0.1.0'
          },
          websockets: {
            sh 'docker tag cellar.hub.core.websockets cellarstone/cellar.hub.core.websockets:0.1.0'
            sh 'docker push cellarstone/cellar.hub.core.websockets:0.1.0'
          },
          mongodb: {
            sh 'docker tag cellar.hub.mongodb cellarstone/cellar.hub.mongodb:0.1.0'
            sh 'docker push cellarstone/cellar.hub.mongodb:0.1.0'
          },
          mqtt: {
            sh 'docker tag cellar.hub.mqtt cellarstone/cellar.hub.mqtt:0.1.0'
            sh 'docker push cellarstone/cellar.hub.mqtt:0.1.0'
          },
          fluentd: {
            sh 'docker tag cellar.hub.fluentd cellarstone/cellar.hub.fluentd:0.1.0'
            sh 'docker push cellarstone/cellar.hub.fluentd:0.1.0'
          },
          prometheus: {
            sh 'docker tag cellar.hub.prometheus cellarstone/cellar.hub.prometheus:0.1.0'
            sh 'docker push cellarstone/cellar.hub.prometheus:0.1.0'
          },
          telegraf: {
            sh 'docker tag cellar.hub.telegraf cellarstone/cellar.hub.telegraf:0.1.0'
            sh 'docker push cellarstone/cellar.hub.telegraf:0.1.0'
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
            sh 'docker tag cellar.hub.module.office.api cellarstone/cellar.hub.module.office.api:0.1.0'
            sh 'docker push cellarstone/cellar.hub.module.office.api:0.1.0'
          },
          office_meeting_rooms: {
            sh 'docker tag cellar.hub.module.office.meetingrooms cellarstone/cellar.hub.module.office.meetingrooms:0.1.0'
            sh 'docker push cellarstone/cellar.hub.module.office.meetingrooms:0.1.0'
          },
          office_reception: {
            sh 'docker tag cellar.hub.module.office.reception cellarstone/cellar.hub.module.office.reception:0.1.0'
            sh 'docker push cellarstone/cellar.hub.module.office.reception:0.1.0'
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