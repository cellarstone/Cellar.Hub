import {EventEmitter} from 'events';

export class Socket {
  private ws: WebSocket;
  private ee: EventEmitter;

  constructor(){
    this.ws = new WebSocket("ws://192.168.1.234:4000");
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
