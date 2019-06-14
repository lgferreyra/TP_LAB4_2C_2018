import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Usuario } from '../usuario';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from "../_services/authentication.service";
import { DomicilioService } from "../_services/domicilio.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Domicilio } from '../domicilio';
import { GeolocationService } from '../_services/geolocation.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  usuario: Usuario = new Usuario();
  domicilio: Domicilio = new Domicilio();
  title: string;
  perfil: number;
  perfilSelected: number = 3;
  loading: boolean = false;
  url: any;
  modifing: boolean;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private geolocationService: GeolocationService,
    private domicilioService: DomicilioService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }
  
  ngOnInit() {
    let token = localStorage.getItem('currentUser');
    this.authService.getProfile(token).subscribe(
      (response) => this.perfil = response
    );
    this.title = this.route.snapshot.data.title;
    this.route.paramMap.subscribe(
      (paramMap: ParamMap)=>{
        let id = parseInt(paramMap.get('id'));
        this.modifing = id!=null;
        if(this.modifing){
          this.userService.getUser(id).subscribe(
            (response=>{
              this.usuario = response;
              this.perfilSelected = this.usuario.perfilID;
            })
          )
        }
      }
    );
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result;
        this.usuario.foto = this.url;
      }
    }
  }

  quitarFoto() {
    this.url = undefined;
  }

  registrar() {
    this.loading = true;
    this.usuario.perfilID = this.perfilSelected;
    this.userService.registrarUsuario(this.usuario)
      .subscribe(
        result => {
          console.log(result);
          this.snackBar.open("Se ha creado el usuario correctamente.", "Cerrar", { duration: 3000 });
          this.router.navigate(['/home']);
        },
        error => {
          console.error(error);
          this.loading = false;
        },
        () => this.loading = false
    );
  }
}
