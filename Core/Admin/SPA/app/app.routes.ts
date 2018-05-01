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

import { CallbackComponent } from './callback/callback.component';



// Wizard multi-step component
import { MultiStepWizardComponent } from './view/workflow/wizard/multi-step-wizard.component';

export const routes: Routes = [
    {
        path: '', component: DashboardDemo 
    },
    { path: 'callback', component: CallbackComponent },
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
    { path: 'workflow/0/new', component: MultiStepWizardComponent},
    { path: '**', redirectTo: '' }
];

// export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
