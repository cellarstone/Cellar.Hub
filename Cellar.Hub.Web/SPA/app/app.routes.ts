import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';


import { Dashboard } from './view/dashboard/dashboard';
import { Login } from './view/login/login';
import { SenzorDetail } from './view/senzor/senzor-detail';
import { SpaceDetail } from './view/space/space-detail';
import { SubspaceDetail } from './view/subspace/subspace-detail';
import { Space2Detail } from './view/space2/space2-detail';

export const routes: Routes = [
    {
        path: '', component: Login 
    },
    { path: 'dashboard', component: Dashboard },
    { path: 'space/:id', component: SpaceDetail },
    { path: 'space2/:id', component: Space2Detail },
    { path: 'subspace/:id', component: SubspaceDetail },
    { path: 'senzor/:id', component: SenzorDetail }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
