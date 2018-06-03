//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// RxJS
import { Subject, Observable } from 'rxjs';

//ngRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from '@ngrx/effects';

//Angular Material
import {MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatChipsModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
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

import { MaterialTimeControlModule } from './modules/timePicker/material-time-control.module';


//GraphQL - Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';



//Cellarstone
import { OfficeGraphqlService } from './services/office-graphql.service';
import { K2ExchangeGraphqlService } from './services/k2exchange-graphql.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { CapitalizePipe } from './shared/capitalize.pipe';
import { AutofocusDirective } from './shared/autofocus.directive';
import { CalendarComponent } from './components/room-detail/calendarComponent/calendarComponent';
import { ReceptionComponent } from './components/room-detail/receptionComponent/receptionComponent';
import { HomeComponent } from './components/room-detail/homeComponent/homeComponent';
import { NavbarComponent } from './components/room-detail/navbar/navbar.component';
import { SnacksComponentComponent } from './components/room-detail/receptionComponent/snacks-component/snacks-component.component';
import { RoomComponent } from './components/room-detail/room-detail.component';
import { TimelineComponent } from './components/room-detail/homeComponent/timeline/timeline.component';
import { AddMeetingDialogComponent } from './components/room-detail/calendarComponent/add-meeting-dialog/add-meeting-dialog.component';
import { CalendarSectionComponent } from './components/room-detail/calendarComponent/calendar-section/calendar-section.component';
import { BookingSectionComponent } from './components/room-detail/calendarComponent/booking-section/booking-section.component';

//Cellarstone ngRX
import { reducers } from 'app/state/reducers/main.reducer';
import { INITIAL_APPLICATION_STATE } from 'app/state/state/application.state';
import { ApplicationEffects } from 'app/state/effects/application.effects';
import { MeetingStatusDialogComponent } from './components/room-detail/calendarComponent/meeting-status-dialog/meeting-status-dialog.component';


import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  imports: [
    //Angular
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    //ngRx
    StoreModule.forRoot(reducers, {initialState: INITIAL_APPLICATION_STATE}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([ApplicationEffects]),
    //GraphQL - Apollo
    ApolloModule,
    HttpLinkModule,
    //Material
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatChipsModule,
    MatListModule,
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
    MaterialTimeControlModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    RoomListComponent,
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
    CalendarSectionComponent,
    BookingSectionComponent,
    MeetingStatusDialogComponent
  ],
  entryComponents: [
    AddMeetingDialogComponent,
    MeetingStatusDialogComponent
  ],
  providers: [OfficeGraphqlService, K2ExchangeGraphqlService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  private officeapiUrl: string = environment.officeApiUrl;
  private k2exchangeUrl: string = environment.k2exchangeUrl;

  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: this.officeapiUrl + '/graphql'
      }),
      cache: new InMemoryCache()
    }, "office");
    
    apollo.create({
      link: httpLink.create({
        uri: this.k2exchangeUrl + '/graphql'
      }),
      cache: new InMemoryCache()
    }, "k2exchange");
  }
}

