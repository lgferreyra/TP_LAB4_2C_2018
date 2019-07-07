import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { AuthenticationService } from "./_services/authentication.service";
import 'rxjs/add/operator/filter'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logged: boolean;
  admin: boolean;
  socio: boolean;
  mozo: boolean;
  bartender: boolean;
  cocinero: boolean;
  cervecero: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService)
    {
      router.events.filter(e => e instanceof NavigationEnd).subscribe(e => {
        let token = localStorage.getItem('currentUser');
        if (token != null) {
          this.logged = true;
          authService.getProfile(token)
          .subscribe(
              (result)=>{
                this.getProfile(result);
              },
              (error)=>{
                console.error(error);
                this.logout();
              }
          );
        } else {
          this.logged = false;
        }
      });
  }

  logout(){
    this.authService.logout();
    this.logged = false;
    this.spinner.show();

    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        this.router.navigate(['/login']);
    }, 500);
  }

  getProfile(id_profile){
    this.admin = false;
    this.bartender = false;
    this.mozo = false;
    this.socio = false;
    this.cocinero = false;
    this.cervecero = false;
    switch (id_profile) {
      case 1:
        this.admin = true;
        break;
      
      case 2:
        this.socio = true;
        break;

      case 3:
        this.mozo = true;
        break;

      case 4:
        this.bartender = true;
        break;
      
      case 5:
        this.cocinero = true;
        break;

      case 6:
        this.cervecero = true;
        break;
      default:
        break;
    }
  }
}
