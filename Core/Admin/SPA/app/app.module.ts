// Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

// RxJS
import 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

//ngRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';

//PrimeNG
import { AccordionModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ChipsModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { ConfirmDialogModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { ContextMenuModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GalleriaModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { InputMaskModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { InplaceModule } from 'primeng/primeng';
import { LightboxModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { MegaMenuModule } from 'primeng/primeng';
import { MenuModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { PanelMenuModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
// import {ProgressBarModule} from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { RatingModule } from 'primeng/primeng';
import { ScheduleModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { SlideMenuModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { SplitButtonModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { TerminalModule } from 'primeng/primeng';
import { TieredMenuModule } from 'primeng/primeng';
import { ToggleButtonModule } from 'primeng/primeng';
import { ToolbarModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';
import { ProgressBarModule } from 'primeng/components/progressbar/progressbar';

//HammerJS - because Kendo UI wants it
import 'hammerjs';

//KENDO UI
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ChartsModule } from '@progress/kendo-angular-charts';

//Inline SVG
import { InlineSVGModule } from 'ng-inline-svg';

//Google maps
import { AgmCoreModule } from '@agm/core';

//CELLARSTONE COMPONENTS ------------------------------------
import { AppComponent } from './app.component';

import { SharedService } from './service/shared.service';
import { IoTService } from './service/iot.service';
import { CdnService } from './service/cdn.service';
import { WorkflowService } from './service/workflow.service';
import { MqttService } from './service/mqtt.service';

import { AppMenuComponent, AppSubMenu } from './app.menu.component';
import { AppTopBar } from './app.topbar.component';
import { AppFooter } from './app.footer.component';
import { DashboardDemo } from './view/dashboard/dashboarddemo';

//places
import { PlaceDashboard } from './view/place/dashboard/place-dashboard';
import { PlaceDetail } from './view/place/detail/place-detail';
import { PlaceBaseInfoComponent } from './components/place/base-info/base-info.component';

//spaces
import { SpaceDetail } from './view/space/detail/space-detail';
import { SpaceList } from './view/space/list/space-list';
import { SpaceBaseInfoComponent } from './components/space/base-info/base-info.component';
import { SpaceListComponent } from './components/space/list/list.component';

//senzors
import { SenzorDetail } from './view/senzor/detail/senzor-detail';
import { SenzorList } from './view/senzor/list/senzor-list';
import { SenzorWorkflowList } from './view/senzor/detail/workflows/workflow-list';
import { SenzorBaseInfoComponent } from './components/senzor/base-info/base-info.component';
import { SenzorListComponent } from './components/senzor/list/list.component';

//senzor types
import { Dht11Panel } from './view/senzor/detail/types/dht11/dht11-panel';
import { PirPanel } from './view/senzor/detail/types/pir/pir-panel';
import { RelayPanel } from './view/senzor/detail/types/relay/relay-panel';





//workflow
import { WorkflowCli } from './view/workflow/cli/workflow-cli';
import { WorkflowList } from './view/workflow/list/workflow-list';
import { WorkflowDetail } from './view/workflow/detail/workflow-detail';
import { WorkflowListComponent } from './components/workflow/list/list.component';
import { Rand2MqttWorkflowComponent } from './components/workflow/rand2mqtt/rand2mqtt.component';
import { TestExceptionWorkflowComponent } from './components/workflow/testexception/testexception.component';
import { DefaultSenzorWorkflowComponent } from './components/workflow/defaultsenzor/defaultsenzor.component';
import { Test1WorkflowComponent } from './components/workflow/test1/test1.component';
import { TimeTriggerComponent } from './components/trigger/time/time.component';
import { MqttTriggerComponent } from './components/trigger/mqtt/mqtt.component';




//Router
import { routes } from './app.routes';

//State
import { reducers } from 'app/state/reducers/main.reducer';
import { SenzorEffects } from 'app/state/effects/senzor.effects';
import { SpaceEffects } from 'app/state/effects/space.effects';
import { PlaceEffects } from 'app/state/effects/place.effects';
import { WorkflowEffects } from 'app/state/effects/workflow.effects';
import { RouterEffects } from 'app/state/effects/router.effects';
// import { INITIAL_APPLICATION_STATE } from './store/todo.state';
import { CustomSerializer } from './state/router-settings';
import { INITIAL_APPLICATION_STATE } from './state/state/application.state';
import { MqttEffects } from 'app/state/effects/mqtt.effects';









@NgModule({
    imports: [
        //Angular
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        //ngRx
        StoreModule.forRoot(reducers, {initialState: INITIAL_APPLICATION_STATE}),
        StoreDevtoolsModule.instrument({
          maxAge: 25
        }),
        EffectsModule.forRoot([MqttEffects, WorkflowEffects, SenzorEffects, SpaceEffects, PlaceEffects, RouterEffects]),
        StoreRouterConnectingModule,
        //PrimeNG
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        InplaceModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScheduleModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,

        // Kendo UI
        ButtonsModule,
        ChartsModule,

        //Inline SVG
        InlineSVGModule,

        //Google maps
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCzctD36QgFcCo-CwKjSBY68CDI80BSoTc'
        })
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenu,
        AppTopBar,
        AppFooter,
        DashboardDemo,
        SpaceDetail,
        SpaceList,
        SenzorDetail,
        SenzorList,
        PlaceDashboard,
        PlaceDetail,
        WorkflowCli,
        WorkflowList,
        WorkflowDetail,
        SenzorBaseInfoComponent,
        SenzorListComponent,
        PlaceBaseInfoComponent,
        SpaceListComponent,
        SpaceBaseInfoComponent,
        WorkflowListComponent,
        Rand2MqttWorkflowComponent,
        Test1WorkflowComponent,
        TestExceptionWorkflowComponent,
        DefaultSenzorWorkflowComponent,
        TimeTriggerComponent,
        MqttTriggerComponent,
        Dht11Panel,
        PirPanel,
        RelayPanel,
        SenzorWorkflowList
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RouterStateSerializer, useClass: CustomSerializer },
        IoTService,
        CdnService,
        SharedService,
        WorkflowService,
        MqttService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
