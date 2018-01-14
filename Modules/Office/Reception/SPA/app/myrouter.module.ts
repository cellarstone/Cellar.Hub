import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './views/home/home.component';
import { ContactComponent } from './views/contact/contact.component';
import { AboutComponent } from './views/about/about.component';

const routes: Routes = [
 { path: '', redirectTo: '/home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent },
 { path: 'about', component: ContactComponent },
 { path: 'contact', component: AboutComponent }
];

@NgModule({
 imports: [ RouterModule.forRoot(routes) ],
 exports: [ RouterModule ]
})
export class MyrouterModule { }