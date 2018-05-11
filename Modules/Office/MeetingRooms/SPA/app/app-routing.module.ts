import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Cellarstone
import { RoomComponent } from './components/room-detail/room-detail.component';
import { CalendarComponent } from './components/room-detail/calendarComponent/calendarComponent';
import { ReceptionComponent } from './components/room-detail/receptionComponent/receptionComponent';
import { HomeComponent } from './components/room-detail/homeComponent/homeComponent';
import { NavbarComponent } from './components/room-detail/navbar/navbar.component';
import { SnacksComponentComponent } from './components/room-detail/receptionComponent/snacks-component/snacks-component.component';
import { RoomListComponent } from './components/room-list/room-list.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/spaces', pathMatch: 'full', data: {animation: {page: 'rootPage'}}},
  { path: 'spaces', component: RoomListComponent},
  { path: 'space/:id', component: RoomComponent, children: [
    { path: 'home', component: HomeComponent, outlet: 'roomDetail'},
    { path: 'calendar', component: CalendarComponent, outlet: 'roomDetail'},
    { path: 'reception', component: ReceptionComponent, outlet: 'roomDetail'},
    { path: 'snacks', component: SnacksComponentComponent, outlet: 'roomDetail'}
  ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) // <-- debugging purposes only
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}