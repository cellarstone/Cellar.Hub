import {Component,Inject,forwardRef} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">            
                <div class="logo">
                    <img src="assets/svg/cellarstone-logo-modern.svg" alt="Logo">
                </div>
            </div>
            
            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i class="fa fa-angle-left"></i>
                </a>

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="fa fa-user"></i>
                </a>
                <ul class="topbar-items fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                    <li #profile class="profile-item" [ngClass]="{'active-top-menu':app.activeTopbarItem === profile}">
                        <a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <img class="profile-image" src="assets/layout/images/avatar-new.png">
                            <span class="topbar-item-name">John Doe</span>
                        </a>

                        <ul class="poseidon-menu fadeInDown">
                           <!-- <li role="menuitem">
                                <a href="#">
                                    <i class="fa fa-fw fa-user"></i>
                                    <span>Profile</span>
                                </a>
                            </li>  -->
                            <li role="menuitem">
                                <a (click)="app.auth.logout()">
                                    <i class="fa fa-fw fa-sign-out"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        .topbar {
            position: relative;
            width: 100%;
            background-color: #fff !important;
        }


        .topbar-left {
            background-color: #fff !important;
            
        }
    `]
})
export class AppTopBar {

    constructor(@Inject(forwardRef(() => AppComponent)) public app:AppComponent) {}

}