import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { CapitalizePipe } from './directives&pipes/capitalize.pipe';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/room/calendarComponent/calendarComponent';
import { ReceptionComponent } from './components/room/receptionComponent/receptionComponent';
import { HomeComponent } from './components/room/homeComponent/homeComponent';
import { NavbarComponent } from './components/room/navbar/navbar.component';
import { SnacksComponentComponent } from './components/room/receptionComponent/snacks-component/snacks-component.component';
import { BuildingListComponent } from './components/building-list/building-list.component';
import { BuildingComponent } from './components/building/building.component';
import { FloorsComponent } from './components/floors/floors.component';
import { RoomComponent } from './components/room/room.component';

import { Floor3Component } from './components/floors/floor-3/floor-3.component';
import { Floor4Component } from './components/floors/floor-4/floor-4.component';

import { DataService } from './services/data.service';
import { SharedService } from './services/shared.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

import { AppRouting } from './app.routing';
import { AutofocusDirective } from './directives&pipes/autofocus.directive';



@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe,
    CalendarComponent,
    ReceptionComponent,
    HomeComponent,
    NavbarComponent,
    SnacksComponentComponent,
    BuildingListComponent,
    BuildingComponent,
    FloorsComponent,
    RoomComponent,
    Floor3Component,
    Floor4Component,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRouting
  ],
  providers: [DataService, SharedService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

