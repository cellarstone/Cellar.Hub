import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService2 {
  private ws: WebSocket;

  isProduction = environment.production;
  isHttps = environment.https;

  private serverUrl: string = '';

  // contructor() {
  //   if (this.isProduction == true && this.isHttps == true) {
  //     this.serverUrl = "ws://cellar.hub.websockets:4000";
  //   }
  //   else if (this.isProduction == true && this.isHttps == false) {
  //     this.serverUrl = "ws://cellar.hub.websockets:4000";
  //   }
  //   else if (this.isProduction == false && this.isHttps == true) {
  //     this.serverUrl = "ws://192.168.1.234:4000";
  //   }
  //   else if (this.isProduction == false && this.isHttps == false) {
  //     this.serverUrl = "ws://192.168.1.234:4000";
  //   }
  // }

  createObservableSocket(url: string, openSubscriber: Subscriber<any>): Observable<any> {


    if (this.isProduction == true && this.isHttps == true) {
      this.serverUrl = "ws://cellar.hub.core.websockets:4000";
    }
    else if (this.isProduction == true && this.isHttps == false) {
      this.serverUrl = "ws://cellar.hub.core.websockets:4000";
    }
    else if (this.isProduction == false && this.isHttps == true) {
      this.serverUrl = "ws://192.168.1.234:4000";
    }
    else if (this.isProduction == false && this.isHttps == false) {
      this.serverUrl = "ws://192.168.1.234:4000";
    }
    console.log(this.serverUrl);
    console.log(this.serverUrl + url);

    this.ws = new WebSocket(this.serverUrl + url);
    return new Observable(observer => {
      this.ws.onmessage = event => observer.next(event.data);
      this.ws.onerror = event => observer.error(event);
      this.ws.onclose = event => observer.complete();
      this.ws.onopen = event => {
        openSubscriber.next();
        openSubscriber.complete();
      };


      return () => this.ws.close();
    });
  }

  send(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}