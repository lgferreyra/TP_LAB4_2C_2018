import { Component, OnInit } from '@angular/core';

import { UserService } from "../_services/user.service";
import { AuthenticationService } from "../_services/authentication.service";
import { Usuario } from '../usuario';
import { Perfil } from '../perfil.enum';

declare var $ :any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  usuarios: Usuario[];
  selectedUsuario: Usuario = new Usuario();
  selectedPerfil: number = -1;
  perfil: number;
  loading: boolean;
  loadingDelete: boolean = false;
  deleteOK: boolean;
  empty: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loading = true;
    let token = localStorage.getItem('currentUser');
    this.authService.getProfile(token).subscribe(
      (response) => {
        this.perfil = response;
        this.userService.getUsersByProfile(response)
          .subscribe(
            (response)=>{
              this.usuarios = response;
              if(this.selectedPerfil!=-1){
                console.log("filtro por " + this.selectedPerfil);
                this.usuarios = this.usuarios.filter((user)=>user.perfilID == this.selectedPerfil);
                console.log(this.usuarios);
              }
              this.empty = this.usuarios.length == 0;
            },
            null,
            ()=>this.loading=false
          );
      }
    );
  }

  public selectUser(usuario: Usuario): void {
    this.selectedUsuario = usuario;
  }

  public eliminarUser(): void {
    this.loadingDelete = true;
    this.userService.deleteUsuario(this.selectedUsuario.id)
      .subscribe((response)=>{
        this.loadingDelete = false;
        this.deleteOK = true;
        $('#confirmation').modal('hide');
        $('#response').modal('show');
      },
      (error)=>{
        this.loadingDelete = false;
        this.deleteOK = false;
        $('#confirmation').modal('hide');
        $('#response').modal('show');
      },
      ()=>{
        $('#confirmation').modal('hide');
        this.loadingDelete = false;
        this.ngOnInit();
      }
    );
  }

  public getPerfil(id){
    return Perfil[id];
  }

}
