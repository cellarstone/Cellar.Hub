import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MymaterialModule } from './/mymaterial.module';
import { MybootstrapModule } from './/mybootstrap.module';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { MyrouterModule } from './/myrouter.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MymaterialModule,
    MybootstrapModule,
    MyrouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
