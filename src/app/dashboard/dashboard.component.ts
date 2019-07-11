import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { PedidoService } from '../_services/pedido.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DetallePedidoService } from '../_services/detalle-pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private pedidoService: PedidoService,
    private detallePedidoService: DetallePedidoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  admin: boolean;
  socio: boolean;
  mozo: boolean;
  bartender: boolean;
  cocinero: boolean;
  cervecero: boolean;

  viewPedidos: boolean;
  viewDetallesPedidos: boolean;

  pedidos = [];
  detallesPedidos = [];
  pedidosTerminados = [];
  detallesPedidosTerminados = [];

  userID;
  perfilID;

  _this = this;

  ngOnInit() {
    this.spinner.show();
    let token = localStorage.getItem('currentUser');
    this.authService.getUserInfo(token).subscribe(
      (result) => {
        this.userID = result.data.id;
        this.perfilID = result.data.perfil;
        this.getProfile(this.perfilID);

        if (this.socio || this.mozo) {
          this.pedidoService.getPedidos().subscribe(
            (result) => {
              this.pedidos = result.pendiente;
              this.pedidosTerminados = result.terminado;
            },
            (error) => {
              console.error(error);
              this.spinner.hide();
            },
            () => this.spinner.hide()
          );
        }

        if (this.cervecero || this.bartender || this.cocinero || this.socio) {
          this.pedidoService.getDetallePedidoDashboard(this.userID).subscribe(
            (result) => {
              console.log(result);
              this.detallesPedidos = result.pendiente;
              this.detallesPedidosTerminados = result.terminado;
            },
            (error) => {
              console.error(error);
              this.spinner.hide();
            },
            () => this.spinner.hide()
          );
        }

      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      }
    );
  }

  getProfile(id_profile) {
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
    this.viewPedidos = this.mozo || this.socio;
    this.viewDetallesPedidos = this.cervecero || this.cocinero || this.bartender || this.socio;
  }

  cancelarPedido(pedido) {

    let time = "1";

    const dialogRef = this.dialog.open(CancelarDialog, {
      width: '270px',
      data: { time: time }
    });

    dialogRef.beforeClosed().subscribe(result => {
      if (result != undefined) {
        this.spinner.show();
        pedido.estadoPedidoID = 5;
        this.pedidoService.cancelarPedido(pedido).subscribe(
          result => {
            console.log(result);
            this.ngOnInit();
            this.snackBar.open("El pedido ha sido cancelado", "", { duration: 3000, verticalPosition: 'bottom' });
          },
          error => {
            console.error(error);
            this.spinner.hide();
          },
          () => this.spinner.hide()
        );
      }
    });
  }

  entregaPedido(pedido) {

    let time = "1";

    const dialogRef = this.dialog.open(EntregarDialog, {
      width: '270px',
      data: { time: time }
    });

    dialogRef.beforeClosed().subscribe(result => {
      if (result != undefined) {
        this.spinner.show();
        pedido.estadoPedidoID = 4;
        this.pedidoService.entregaPedido(pedido).subscribe(
          response => {
            console.log(response);
            this.ngOnInit();
            this.snackBar.open("El pedido se ha entregado", "", { duration: 3000, verticalPosition: 'bottom' });
          },
          error => {
            console.error(error);
            this.spinner.hide();
          },
          () => this.spinner.hide()
        );
      }
    });
  }

  comenzarDetallePedido(detallePedido) {

    let time = "1";

    const dialogRef = this.dialog.open(ComenzarDialog, {
      width: '270px',
      data: { time: time }
    });

    dialogRef.beforeClosed().subscribe(result => {
      if (result != undefined) {
        this.spinner.show();
        detallePedido.tiempoEstimado = parseInt(result.time);
        detallePedido.estadoPedidoID = 2;
        detallePedido.usuarioID = this.userID;
        console.log(detallePedido);
        this.detallePedidoService.updatePedidoDetalle(detallePedido).subscribe(
          result => {
            console.log(result);
            this.ngOnInit();
            this.snackBar.open("El pedido ha sido actualizado", "", { duration: 3000, verticalPosition: 'bottom' });
          },
          error => {
            console.error(error);
            this.spinner.hide();
          },
          () => this.spinner.hide()
        );
      }
    });
  }

  finalizarDetallePedido(detallePedido) {

    let time = "1";

    const dialogRef = this.dialog.open(FinalizarDialog, {
      width: '270px',
      data: { time: time }
    });

    dialogRef.beforeClosed().subscribe(result => {
      if (result != undefined) {
        this.spinner.show();
        detallePedido.estadoPedidoID = 3;
        console.log(detallePedido);
        this.detallePedidoService.updatePedidoDetalle(detallePedido).subscribe(
          result => {
            this.snackBar.open("El pedido ha sido actualizado", "", { duration: 3000, verticalPosition: 'bottom' });
            this.ngOnInit();
          },
          error => {
            console.error(error);
            this.spinner.hide();
          },
          () => this.spinner.hide()
        );
      }
    });
  }

  verPedido(pedido) {
    this.spinner.show();
    this.pedidoService.getDetallePedido(pedido.pedidoID).subscribe(
      (result) => {
        const dialogRef = this.dialog.open(ConsultaDialog, {
          width: '75%',
          data: { items: result, title: pedido.codigoPedido }
        });
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      },
      ()=>this.spinner.hide()
    );
  }
}

@Component({
  selector: 'comenzar-dialog',
  templateUrl: 'comenzar-dialog.html',
})
export class ComenzarDialog {

  constructor(
    public dialogRef: MatDialogRef<ComenzarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'finalizar-dialog',
  templateUrl: 'finalizar-dialog.html',
})
export class FinalizarDialog {

  constructor(
    public dialogRef: MatDialogRef<FinalizarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'consulta-dialog',
  templateUrl: 'consulta-dialog.html',
})
export class ConsultaDialog {

  constructor(
    public dialogRef: MatDialogRef<ConsultaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'entregar-dialog',
  templateUrl: 'entregar-dialog.html',
})
export class EntregarDialog {

  constructor(
    public dialogRef: MatDialogRef<EntregarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'cancelar-dialog',
  templateUrl: 'cancelar-dialog.html',
})
export class CancelarDialog {

  constructor(
    public dialogRef: MatDialogRef<CancelarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
