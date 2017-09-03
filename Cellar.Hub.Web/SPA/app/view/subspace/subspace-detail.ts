import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscriber } from 'rxjs'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { SVGCacheService } from 'ng-inline-svg';

import { Socket } from '../../service/Socket';



@Component({
  templateUrl: './subspace-detail.html',
  styleUrls: ['./subspace-detail.scss']
})
export class SubspaceDetail implements OnInit {

  public temperatureValue: string;

  public state = {
    channels: [],
    users: [],
    messages: [],
    activeChannel: {
      id: ''
    },
    connected: false

  }


  public senzor1 = "s2315";
  public senzor1ActualValue_temperature = 0;
  public senzor1Values_temperature = [];
  public senzor1ActualValue_humidity = 0;
  public senzor1Values_humidity = [];

  public senzor2 = "s2316";
  public senzor2ActualValue_temperature = 0;
  public senzor2Values_temperature = [];
  public senzor2ActualValue_humidity = 0;
  public senzor2Values_humidity = [];

  public senzor3 = "s2317";
  public senzor3ActualValue_temperature = 0;
  public senzor3Values_temperature = [];
  public senzor3ActualValue_humidity = 0;
  public senzor3Values_humidity = [];


  public reservationsLayer: any;
  public temperatureLayer: any;
  public humidityLayer: any;
  public camerasLayer: any;
  public opencloseLayer: any;

  public socket: Socket;

  constructor(private router: Router,
              private svgService: SVGCacheService) {
      svgService.setBaseUrl({ baseUrl: 'http://localhost:8881/' });
   }
  
  




  ngOnInit() {

    this.humidityLayer = document.getElementById("Humidities");
    this.reservationsLayer = document.getElementById("Reservations");
    this.camerasLayer = document.getElementById("Cameras");
    this.opencloseLayer = document.getElementById("OpenCloses");
    this.temperatureLayer = document.getElementById("Temperatures");


    // this.subscribewebsocket()
    // .subscribe(
    // data => {
    //     console.log(data);


    //     this.temperatureValue = data;
    // },
    // error => console.error(error));


    this.socket = new Socket();
    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    // this.socket.on('channel add', this.onAddChannel.bind(this));
    // this.socket.on('user add', this.onAddUser.bind(this));
    // this.socket.on('user edit', this.onEditUser.bind(this));
    // this.socket.on('user remove', this.onRemoveUser.bind(this));
    this.socket.on('message add', this.onMessageAdd.bind(this));
    this.socket.on('message edit', this.onMessageEdit.bind(this));
  }

  // subscribewebsocket(): Observable<any> {
  //     let openSubscriber = Subscriber.create(
  //         () => {});

  //     return this.websocketService.createObservableSocket('/s2315/temperature', openSubscriber)
  //         .map(message => message);
  // }


  onMessageAdd(message) {
    let { messages } = this.state;
    messages.push(message);
    this.state.messages = messages;
  }

  onMessageEdit(message) {
    console.log(message);

    if (message.senzorId == this.senzor1) {
      if (message.measurement == "temperature") {
        this.senzor1ActualValue_temperature = message.values[message.values.length - 1];
        this.senzor1Values_temperature = message.values;
      }
      if (message.measurement == "humidity") {
        this.senzor1ActualValue_humidity = message.values[message.values.length - 1];
        this.senzor1Values_humidity = message.values;
      }
    }

    if (message.senzorId == this.senzor2) {
      if (message.measurement == "temperature") {
        this.senzor2ActualValue_temperature = message.values[message.values.length - 1];
        this.senzor2Values_temperature = message.values;
      }
      if (message.measurement == "humidity") {
        this.senzor2ActualValue_humidity = message.values[message.values.length - 1];
        this.senzor2Values_humidity = message.values;
      }
    }

    if (message.senzorId == this.senzor3) {
      if (message.measurement == "temperature") {
        this.senzor3ActualValue_temperature = message.values[message.values.length - 1];
        this.senzor3Values_temperature = message.values;
      }
      if (message.measurement == "humidity") {
        this.senzor3ActualValue_humidity = message.values[message.values.length - 1];
        this.senzor3Values_humidity = message.values;
      }
    }

  }

  // onRemoveUser(removeUser){
  //   let {users} = this.state;
  //   users = users.filter(user => {
  //     return user.id !== removeUser.id;
  //   });
  //   this.state.users = users;
  // }
  // onAddUser(user){
  //   let {users} = this.state;
  //   users.push(user);
  //   this.state.users = users;
  // }
  // onEditUser(editUser){
  //   let {users} = this.state;
  //   users = users.map(user => {
  //     if(editUser.id === user.id){
  //       return editUser;
  //     }
  //     return user;
  //   });
  //   this.state.users = users;
  // }
  onConnect() {
    this.state.connected = true;
    this.socket.emit('channel subscribe', {});
    this.socket.emit('user subscribe', {});
  }
  onDisconnect() {
    this.state.connected = false;
  }
  // onAddChannel(channel){
  //   let {channels} = this.state;
  //   channels.push(channel);
  //   this.state.channels = channels;
  // }
  // addChannel(name){
  //   this.socket.emit('channel add', {name});
  // }
  // setChannel(activeChannel){
  //   this.state.activeChannel = activeChannel;
  //   this.socket.emit('message unsubscribe',{});

  //   this.state.messages = [];
  //   this.socket.emit('message subscribe',
  //     {channelId: activeChannel.id});
  // }
  // setUserName(name){
  //   this.socket.emit('user edit', {name});
  // }
  // addMessage(body){
  //   let activeChannel = this.state.activeChannel;
  //   this.socket.emit('message add',
  //     {channelId: activeChannel.id, body});
  // }


showHumidity(){
  //others hide
  this.camerasLayer.setAttribute("style","display: none;");
  // this.humidityLayer.setAttribute("style","display: none;");
  this.opencloseLayer.setAttribute("style","display: none;");
  this.reservationsLayer.setAttribute("style","display: none;");
  this.temperatureLayer.setAttribute("style","display: none;");

  //this layer show
  this.humidityLayer.setAttribute("style","display: inline;");
}

showCalendar(){
  //others hide
  this.camerasLayer.setAttribute("style","display: none;");
  this.humidityLayer.setAttribute("style","display: none;");
  this.opencloseLayer.setAttribute("style","display: none;");
  // this.reservationsLayer.setAttribute("style","display: none;");
  this.temperatureLayer.setAttribute("style","display: none;");

  //this layer show
  this.reservationsLayer.setAttribute("style","display: inline;");
}

showCamera(){
  //others hide
  // this.camerasLayer.setAttribute("style","display: none;");
  this.humidityLayer.setAttribute("style","display: none;");
  this.opencloseLayer.setAttribute("style","display: none;");
  this.reservationsLayer.setAttribute("style","display: none;");
  this.temperatureLayer.setAttribute("style","display: none;");

  //this layer show
  this.camerasLayer.setAttribute("style","display: inline;");
}

showOpenClose(){
  //others hide
  this.camerasLayer.setAttribute("style","display: none;");
  this.humidityLayer.setAttribute("style","display: none;");
  // this.opencloseLayer.setAttribute("style","display: none;");
  this.reservationsLayer.setAttribute("style","display: none;");
  this.temperatureLayer.setAttribute("style","display: none;");

  //this layer show
  this.opencloseLayer.setAttribute("style","display: inline;");
}

showTemperature(){
  //others hide
  this.camerasLayer.setAttribute("style","display: none;");
  this.humidityLayer.setAttribute("style","display: none;");
  this.opencloseLayer.setAttribute("style","display: none;");
  this.reservationsLayer.setAttribute("style","display: none;");
  // this.temperatureLayer.setAttribute("style","display: none;");

  //this layer show
  this.temperatureLayer.setAttribute("style","display: inline;");
}


  onBackButton() {
    this.router.navigate(['/space/1']);
  }
}