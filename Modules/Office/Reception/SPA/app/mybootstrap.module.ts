import { NgModule } from '@angular/core';
import {
 AlertModule,
 ButtonsModule,
 BsDropdownModule
} from 'ngx-bootstrap';

@NgModule({
 imports: [
   AlertModule.forRoot(),
   ButtonsModule.forRoot(),
   BsDropdownModule.forRoot()
 ],
 exports: [
   AlertModule,
   ButtonsModule,
   BsDropdownModule
 ]
})
export class MybootstrapModule { }