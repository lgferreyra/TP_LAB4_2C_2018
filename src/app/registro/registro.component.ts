import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UserService } from '../_services/user.service';
import { Perfil } from '../perfil.enum';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Domicilio } from '../domicilio';
import { DomicilioService } from '../_services/domicilio.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario = new Usuario();
  domicilio: Domicilio = new Domicilio();
  loading: boolean = false;
  url: any;
  perfiles = [];

  constructor(
    private userService: UserService,
    private domicilioService: DomicilioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.userService.getPerfiles().subscribe(
      (result) => this.perfiles = result,
      error => console.error(error)
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
    console.log(this.usuario);
    this.loading = true;
    this.spinner.show();
    this.userService.registrarUsuario(this.usuario).subscribe(
      result => {
        console.log(result);
        this.snackBar.open("El usuario fue dado de alta correctamente", "Cerrar", { duration: 3000 , verticalPosition: "bottom"});
        this.router.navigate(['/user-list']);
      },
      error => {
        console.error(error);
        this.loading = false;
        this.spinner.hide();
      },
      () => {
        this.loading = false;
        this.spinner.hide();
      }
    );
  }

}
