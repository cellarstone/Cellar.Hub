import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
// RxJS
import 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';



import { AppComponent } from './app.component';
import { RoomListComponent } from './components/room-list/room-list.component';

import { ApiService } from './services/api.service';
import { SharedService } from './services/shared.service';
import { OfficeGraphqlService } from './services/office-graphql.service';
import { K2ExchangeGraphqlService } from './services/k2exchange-graphql.service';

import { AppRoutingModule } from './app-routing.module';


//GraphQL - Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';




@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    //GraphQL - Apollo
    ApolloModule,
    HttpLinkModule
  ],
  providers: [ApiService, SharedService, OfficeGraphqlService, K2ExchangeGraphqlService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'http://officeapi.cellarstone.hub/graphql'
      }),
      cache: new InMemoryCache()
    }, "office");
    
    apollo.create({
      link: httpLink.create({
        uri: 'http://dce4943a.ngrok.io/api/graphql'
      }),
      cache: new InMemoryCache()
    }, "k2exchange");
  }
}

