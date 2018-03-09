import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';


const appRoutes: Routes = [
  { path: '', redirectTo: '/buildings', pathMatch: 'full', data: {animation: {page: 'rootPage'}}},
  { path: 'buildings', component: BuildingListComponent, data: {animation: {page: 'buildingsPage'}}},
  { path: 'building/:id', component: BuildingComponent},
  { path: 'floor', component: FloorsComponent},
  { path: 'floor/3', component: Floor3Component},
  { path: 'floor/4', component: Floor4Component},
  { path: 'room/:name', component: RoomComponent, children: [
    {path: '',  redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'reception', component: ReceptionComponent},
    { path: 'reception/snacks', canActivate: [AuthGuard], component: SnacksComponentComponent}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) // <-- debugging purposes only
  ],
  exports: [RouterModule]
})

export class AppRouting {

}