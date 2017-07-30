import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';


import { Dashboard } from './view/dashboard/dashboard';
import { SenzorDetail } from './view/senzor/senzor-detail';
import { SpaceDetail } from './view/space/space-detail';

export const routes: Routes = [
    {
        path: '', component: Dashboard 
    },
    { path: 'space/:id', component: SpaceDetail },
    { path: 'senzor/:id', component: SenzorDetail }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
