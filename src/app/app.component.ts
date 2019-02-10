import { Component, ViewChild, ElementRef,AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent{


    baseMenu: ElementRef
    isCollapse = true;

    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    // get isAdmin {}
    get isAuth(): Boolean {
        console.log("isAuth: ", this.currentUser);
        return this.currentUser 
            && this.currentUser.role === Role.Admin 
            && this.currentUser.functionIdList.indexOf("M-FUNC-003") > -1;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    public openBaseMenu() {
        console.log("openBaseMenu() is triggered. ", this.isCollapse);
        this.isCollapse = !this.isCollapse;
        console.log("After isCollapse: ", this.isCollapse)
        //this.baseMenu.nativeElement.ViewChild
    }

    setMenuStyle(){
        let styles = {
            'width': this.isCollapse ? '0' : '250px'
          };
          return styles;
    }

    setMain(){
        let styles = {
            'marginLeft': this.isCollapse ? '0' : '250px'
          };
          return styles;
    }

    
    
}