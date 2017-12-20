import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';


import {DashboardDemo} from './view/dashboard/dashboarddemo';

import {PlaceDashboard} from './view/place/dashboard/place-dashboard';
import {PlaceDetail} from './view/place/detail/place-detail';

import {SpaceDetail} from './view/space/detail/space-detail';
import {SpaceList} from './view/space/list/space-list';

import {SenzorDetail} from './view/senzor/detail/senzor-detail';
import {SenzorList} from './view/senzor/list/senzor-list';

import { WorkflowCliComponent } from './view/workflow/cli/cli.component';


export const routes: Routes = [
    {
        path: '', component: DashboardDemo 
    },
    { path: 'dashboard', component: DashboardDemo },
    { path: 'places/dashboard', component: PlaceDashboard },
    { path: 'place/:id', component: PlaceDetail },
    { path: 'spaces', component: SpaceList },
    { path: 'space/:id', component: SpaceDetail },
    { path: 'senzors', component: SenzorList },
    { path: 'senzor/:id', component: SenzorDetail },
    { path: 'workflow/cli', component: WorkflowCliComponent },
];

// export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
