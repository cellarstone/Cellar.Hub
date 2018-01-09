import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { AppComponent } from './app.component';
import { CalendarComponentComponent } from './components/room/calendarComponent/calendarComponent';
import { ReceptionComponent } from './components/room/receptionComponent/receptionComponent';
import { HomeComponent } from './components/room/homeComponent/homeComponent';


import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/room/navbar/navbar.component';
import { SnacksComponentComponent } from './components/room/receptionComponent/snacks-component/snacks-component.component';
import { BuildingListComponent } from './components/building-list/building-list.component';
import { BuildingComponent } from './components/building/building.component';
import { FloorsComponent } from './components/floors/floors.component';
import { RoomComponent } from './components/room/room.component';

import { DataService } from './services/data.service';
import { SharedService } from './services/shared.service';
import { EventService } from './services/event.service';
import { Floor3Component } from './components/floors/floor-3/floor-3.component';
import { Floor4Component } from './components/floors/floor-4/floor-4.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/buildings', pathMatch: 'full'},
  { path: 'buildings', component: BuildingListComponent},
  { path: 'building/:id', component: BuildingComponent},
  // { path: 'floor', component: FloorsComponent},
  { path: 'floor/3', component: Floor3Component},
  { path: 'floor/4', component: Floor4Component},
  { path: 'room/:string', component: RoomComponent, children: [
    {path: '',  redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'calendar', component: CalendarComponentComponent},
    {path: 'reception', component: ReceptionComponent},
    { path: 'reception/snacks', component: SnacksComponentComponent}
  ]}
  
];


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponentComponent,
    ReceptionComponent,
    HomeComponent,
    NavbarComponent,
    SnacksComponentComponent,
    BuildingListComponent,
    BuildingComponent,
    FloorsComponent,
    RoomComponent,
    Floor3Component,
    Floor4Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [DataService, SharedService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }

