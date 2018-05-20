import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BuildingListComponent } from './views/building-list/building-list.component'
import { Floor3Component } from './views/floors/floor-3/floor-3.component'


const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full', data: {animation: {page: 'rootPage'}}},
  { path: 'welcome', component: BuildingListComponent, data: {animation: {page: 'buildingsPage'}}},
  { path: 'floor/3', component: Floor3Component}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes) // <-- debugging purposes only
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}