import {EventEmitter} from 'events';
import { environment } from 'environments/environment';

export class Socket {
  private ws: WebSocket;
  public ee: EventEmitter;

  constructor(url: string){

    let fullurl = "";

    if(environment.production){
      fullurl = "ws://websockets.cellarstone.hub/ws/";
    } else {
      fullurl = "ws://localhost:44406/ws/";
    }

    fullurl += url;

    this.ws = new WebSocket(url);
    this.ee = new EventEmitter();
    this.ws.onmessage = this.message.bind(this);
    this.ws.onopen = this.open.bind(this);
    this.ws.onclose = this.close.bind(this);
  }
  on(name, fn){
    this.ee.on(name, fn);
  }
  off(name, fn){
    this.ee.removeListener(name, fn);
  }
  emit(name, data){
    const message = JSON.stringify({name, data});
    this.ws.send(message);
  }
  message(e){
    try{
      const message = JSON.parse(e.data);
      this.ee.emit(message.name, message.data);
    }
    catch(err){
      this.ee.emit('error', err);
    }
  }
  open(){
    this.ee.emit('connect');
  }
  close(){
    this.ee.emit('disconnect');
  }
}
