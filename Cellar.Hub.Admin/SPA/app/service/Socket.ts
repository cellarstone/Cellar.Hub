import {EventEmitter} from 'events';

export class Socket {
  private ws: WebSocket;
  private ee: EventEmitter;

  constructor(url: string){
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
