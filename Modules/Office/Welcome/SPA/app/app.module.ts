import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { BuildingListComponent } from './views/building-list/building-list.component'
import { Floor3Component } from './views/floors/floor-3/floor-3.component'

import { AppRoutingModule } from './app.routing'


@NgModule({
  declarations: [
    AppComponent,
    BuildingListComponent,
    Floor3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
