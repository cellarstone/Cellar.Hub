//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material
import {MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatChipsModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule} from '@angular/material';
       
import {CdkTableModule} from '@angular/cdk/table';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {ObserversModule} from '@angular/cdk/observers';
import {PortalModule} from '@angular/cdk/portal';
import {MatMomentDateModule} from "@angular/material-moment-adapter";



import { MaterialTimeControlModule } from '../timePicker/material-time-control.module';


//Cellarstone
import { CapitalizePipe } from '../../shared/capitalize.pipe';
import { AutofocusDirective } from '../../shared/autofocus.directive';
import { CalendarComponent } from './calendarComponent/calendarComponent';
import { ReceptionComponent } from './receptionComponent/receptionComponent';
import { HomeComponent } from './homeComponent/homeComponent';
import { NavbarComponent } from './navbar/navbar.component';
import { SnacksComponentComponent } from './receptionComponent/snacks-component/snacks-component.component';
import { RoomComponent } from './room.component';
import { TimelineComponent } from './homeComponent/timeline/timeline.component';
import { MeetingRoomRoutingModule } from './meeting-room-routing.module';
import { AddMeetingDialogComponent } from './calendarComponent/add-meeting-dialog/add-meeting-dialog.component';
import { RemoveMeetingDialogComponent } from './calendarComponent/remove-meeting-dialog/remove-meeting-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MeetingRoomRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    CdkTableModule,
    A11yModule,
    BidiModule,
    CdkAccordionModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    MatMomentDateModule,
    MaterialTimeControlModule
  ],
  declarations: [
    CapitalizePipe,
    CalendarComponent,
    ReceptionComponent,
    HomeComponent,
    NavbarComponent,
    SnacksComponentComponent,
    TimelineComponent,
    RoomComponent,
    AutofocusDirective,
    AddMeetingDialogComponent,
    RemoveMeetingDialogComponent
  ],
  entryComponents: [
    AddMeetingDialogComponent
  ]
})
export class MeetingRoomModule { }
