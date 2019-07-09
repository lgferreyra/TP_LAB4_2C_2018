import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usuarios = [];

  constructor(
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.getUsuarios().subscribe(
      result=>{
        console.log(result);
        this.usuarios = result;
      },
      error=>console.error(error)
    );
  }

  suspenderUsuario(usuario){

    const dialogRef = this.dialog.open(ConfirmarDialog, {
      width: '270px',
      data: { accion: "suspender" }
    });

    dialogRef.beforeClosed().subscribe(result => {
      if (result != undefined) {
        usuario.suspendido = 1;
        this.spinner.show();
        this.userService.suspenderUsuario(usuario).subscribe(
          result=>{
            console.log(result);
            this.snackBar.open("El usuario ha sido suspendido", "", {duration:3000,verticalPosition:"bottom"});
            this.ngOnInit();
          },
          error=>{
            console.error(error);
            this.spinner.hide();
          },
          ()=>this.spinner.hide()
        );
      }
    });

  }

  habilitarUsuario(usuario){

    const dialogRef = this.dialog.open(ConfirmarDialog, {
      width: '270px',
      data: { accion: "habilitar" }
    });

    dialogRef.beforeClosed().subscribe(result => {
      if (result != undefined) {
        usuario.suspendido = 0;
        this.spinner.show();
        this.userService.suspenderUsuario(usuario).subscribe(
          result=>{
            console.log(result);
            this.snackBar.open("El usuario ha sido habilitado", "", {duration:3000,verticalPosition:"bottom"});
            this.ngOnInit();
          },
          error=>{
            console.error(error);
            this.spinner.hide();
          },
          ()=>this.spinner.hide()
        );
        
      }
    });

  }

  eliminarUsuario(usuario){

    const dialogRef = this.dialog.open(ConfirmarDialog, {
      width: '270px',
      data: { accion: "eliminar" }
    });

    dialogRef.beforeClosed().subscribe(result => {
      if (result != undefined) {
        
        this.userService.eliminarUsuario(usuario).subscribe(
          result=>{
            console.log(result);
            this.snackBar.open("El usuario ha sido eliminado", "", {duration:3000,verticalPosition:"bottom"});
            this.ngOnInit();
          },
          error=>{
            console.error(error);
            this.spinner.hide();
          },
          ()=>this.spinner.hide()
        );
      }
    });

  }
}

@Component({
  selector: 'confirmar-dialog',
  templateUrl: 'confirmar-dialog.html',
})
export class ConfirmarDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
