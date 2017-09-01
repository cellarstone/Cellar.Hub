import {Component,OnInit} from '@angular/core';

import { Subscriber } from 'rxjs'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

// import { WebsocketService2 } from '../../service/websocket2.service';
import { Socket } from '../../service/Socket';


@Component({
    templateUrl: './space-detail.html'
})
export class SpaceDetail implements OnInit {
    
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

    public socket: Socket;

    constructor() {


     }
    



    ngOnInit() {
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
        this.socket.on('channel add', this.onAddChannel.bind(this));
        this.socket.on('user add', this.onAddUser.bind(this));
        this.socket.on('user edit', this.onEditUser.bind(this));
        this.socket.on('user remove', this.onRemoveUser.bind(this));
        this.socket.on('message add', this.onMessageAdd.bind(this));
        this.socket.on('message edit', this.onMessageEdit.bind(this));
    }

    // subscribewebsocket(): Observable<any> {
    //     let openSubscriber = Subscriber.create(
    //         () => {});

    //     return this.websocketService.createObservableSocket('/s2315/temperature', openSubscriber)
    //         .map(message => message);
    // }


    onMessageAdd(message){
        let {messages} = this.state;
        messages.push(message);
        this.state.messages = messages;
      }

      onMessageEdit(message){
        console.log(message);
      }

      onRemoveUser(removeUser){
        let {users} = this.state;
        users = users.filter(user => {
          return user.id !== removeUser.id;
        });
        this.state.users = users;
      }
      onAddUser(user){
        let {users} = this.state;
        users.push(user);
        this.state.users = users;
      }
      onEditUser(editUser){
        let {users} = this.state;
        users = users.map(user => {
          if(editUser.id === user.id){
            return editUser;
          }
          return user;
        });
        this.state.users = users;
      }
      onConnect(){
        this.state.connected = true;
        this.socket.emit('channel subscribe',{});
        this.socket.emit('user subscribe',{});
      }
      onDisconnect(){
        this.state.connected = false;
      }
      onAddChannel(channel){
        let {channels} = this.state;
        channels.push(channel);
        this.state.channels = channels;
      }
      addChannel(name){
        this.socket.emit('channel add', {name});
      }
      setChannel(activeChannel){
        this.state.activeChannel = activeChannel;
        this.socket.emit('message unsubscribe',{});

        this.state.messages = [];
        this.socket.emit('message subscribe',
          {channelId: activeChannel.id});
      }
      setUserName(name){
        this.socket.emit('user edit', {name});
      }
      addMessage(body){
        let activeChannel = this.state.activeChannel;
        this.socket.emit('message add',
          {channelId: activeChannel.id, body});
      }
}