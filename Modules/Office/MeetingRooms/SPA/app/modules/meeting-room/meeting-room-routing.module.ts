import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room.component';
import { HomeComponent } from './homeComponent/homeComponent';
import { CalendarComponent } from './calendarComponent/calendarComponent';
import { ReceptionComponent } from './receptionComponent/receptionComponent';
import { SnacksComponentComponent } from './receptionComponent/snacks-component/snacks-component.component';


const meetingroomRoutes: Routes = [
  { path: '', component: RoomComponent, children: [
    { path: 'home', component: HomeComponent},
    { path: 'calendar', component: CalendarComponent},
    { path: 'reception', component: ReceptionComponent},
    { path: 'reception/snacks', component: SnacksComponentComponent}
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(meetingroomRoutes)
  ],
  exports: [RouterModule]
})
export class MeetingRoomRoutingModule { }
