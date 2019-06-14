import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  admin: boolean;
  socio: boolean;
  mozo: boolean;
  bartender: boolean;
  cocinero: boolean;
  cervecero: boolean;

  ngOnInit() {
    let token = localStorage.getItem('currentUser');
    this.authService.getProfile(token).subscribe(
      (result)=>{
        this.getProfile(result);
      },
      (error)=>{
        console.error(error);
      }
    );
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
