import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
 
@Injectable()
export class ProfileGuard implements CanActivate {
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }
 
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole: Array<number> = route.data.expectedRole;
        const perfilID = JSON.parse(localStorage.getItem('currentUser')).perfilID;
        
        if(expectedRole.includes(perfilID) || expectedRole.length == 0){
            return true;
        } else {
            return false;
        }
      }
}