import {EventEmitter} from 'events';
import { environment } from '../../environments/environment';

export class Socket {
  private ws: WebSocket;
  public ee: EventEmitter;

  isProduction = environment.production;
  isHttps = environment.https;

  private serverUrl: string = '';

  constructor(url: string){

    if (this.isProduction == true ) {
      this.serverUrl = "ws://websockets.cellarstone.hub/ws/";
  }
  else if (this.isProduction == false) {
      this.serverUrl = "ws://localhost:44406/ws/";
  }

    this.ws = new WebSocket(this.serverUrl + url);
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
