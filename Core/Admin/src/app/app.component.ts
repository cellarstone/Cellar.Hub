import {Component,AfterViewInit,ElementRef,Renderer,ViewChild, OnInit} from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

enum MenuOrientation {
    STATIC,
    OVERLAY,
    HORIZONTAL
};

// declare var jQuery: any;
//var jQuery = require('jquery');
// require('nanoscroller')
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    
    layoutCompact: boolean = false;

    layoutMode: MenuOrientation = MenuOrientation.STATIC;
        
    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutContainer: HTMLDivElement;

    layoutMenuScroller: HTMLDivElement;

    modal: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    documentClickListener: Function;

    resetMenu: boolean;

    @ViewChild('layoutWrapper') layourContainerViewChild: ElementRef;

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    constructor(public renderer: Renderer,
                public auth: AuthService,
                private swUpdate: SwUpdate ) {
            auth.handleAuthentication();

            if(!this.auth.isAuthenticated()){
                //this.auth.login()
                console.log("IS NOT AUTHENTICATED 1")
            } else {
                console.log("IS AUTHENTICATED 1")
            }

        }

    login(){
        this.auth.login()
    }

    ngOnInit(){
        //if service worker is enabled
          if(this.swUpdate.isEnabled){
            //set automatically interval to check a new version
            interval(60000).subscribe(() => {
              this.swUpdate.checkForUpdate();
            });
            //refresh browser if user agreed
            this.swUpdate.available.subscribe((event) => {
              if(confirm("New version available. Reload App ? :-)")){
                window.location.reload();
              }
            });
          }
      }

    ngAfterViewInit() {
        if(!this.auth.isAuthenticated()){
            //this.auth.login()
            console.log("IS NOT AUTHENTICATED 2")
        } else {
            console.log("IS AUTHENTICATED 2")

        this.layoutContainer = <HTMLDivElement> this.layourContainerViewChild.nativeElement;
        this.layoutMenuScroller = <HTMLDivElement> this.layoutMenuScrollerViewChild.nativeElement;

        //hides the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', (event) => {
            if(!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if(!this.menuClick && this.isHorizontal()) {
                this.resetMenu = true;
            }

            this.topbarItemClick = false;
            this.menuClick = false;
        });
        
        // setTimeout(() => {
        //     jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
        // }, 10);
        }
    }

    onMenuButtonClick(event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if(this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        else {
            if(this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            }
            else {
                if(this.staticMenuMobileActive) {
                    this.staticMenuMobileActive = false;
                }
                else {
                    this.staticMenuMobileActive = true;
                }
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        // if(!this.isHorizontal()) {
        //     setTimeout(() => {
        //         jQuery(this.layoutMenuScroller).nanoScroller();
        //     }, 500);
        // }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        
        if(this.overlayMenuActive || this.staticMenuMobileActive) {
            this.rotateMenuButton = false;
            this.overlayMenuActive = false;
            this.staticMenuMobileActive = false;
        }
        
        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if(this.activeTopbarItem === item)
            this.activeTopbarItem = null;
        else
            this.activeTopbarItem = item;

        event.preventDefault();
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }  

        //jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
    }

}