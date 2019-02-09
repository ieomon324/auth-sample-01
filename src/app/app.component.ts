import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
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
}