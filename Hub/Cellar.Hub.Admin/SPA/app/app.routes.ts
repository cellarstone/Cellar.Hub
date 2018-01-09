import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';


import {DashboardDemo} from './view/dashboard/dashboarddemo';

import {PlaceDashboard} from './view/place/dashboard/place-dashboard';
import {PlaceDetail} from './view/place/detail/place-detail';

import {SpaceDetail} from './view/space/detail/space-detail';
import {SpaceList} from './view/space/list/space-list';

import {SenzorDetail} from './view/senzor/detail/senzor-detail';
import {SenzorList} from './view/senzor/list/senzor-list';

import { WorkflowCli } from './view/workflow/cli/workflow-cli';
import { WorkflowList } from './view/workflow/list/workflow-list';
import { WorkflowDetail } from 'app/view/workflow/detail/workflow-detail';

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
    { path: 'workflow/cli', component: WorkflowCli },
    { path: 'workflows', component: WorkflowList },
    { path: 'workflow/:id', component: WorkflowDetail },
];

// export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
