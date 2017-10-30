import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';


import {DashboardDemo} from './view/dashboard/dashboarddemo';

import {PlaceDashboard} from './view/place/dashboard/place-dashboard';

import {SpaceDashboard} from './view/space/dashboard/space-dashboard';
import {SpaceDetail} from './view/space/detail/space-detail';
import {SpaceList} from './view/space/list/space-list';

import {SenzorDashboard} from './view/senzor/dashboard/senzor-dashboard';
import {SenzorDetail} from './view/senzor/detail/senzor-detail';
import {SenzorList} from './view/senzor/list/senzor-list';

export const routes: Routes = [
    {
        path: '', component: DashboardDemo 
    },
    { path: 'dashboard', component: DashboardDemo },
    { path: 'places/dashboard', component: PlaceDashboard },
    { path: 'spaces/dashboard', component: SpaceDashboard },
    { path: 'spaces', component: SpaceList },
    { path: 'space/:id', component: SpaceDetail },
    { path: 'senzors/dashboard', component: SenzorDashboard },
    { path: 'senzors', component: SenzorList },
    { path: 'senzor/:id', component: SenzorDetail }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
