import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { PedidoService } from '../_services/pedido.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DetallePedidoService } from '../_services/detalle-pedido.service';

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
    public dialog: MatDialog
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

  userID;
  perfilID;

  ngOnInit() {
    let token = localStorage.getItem('currentUser');
    this.authService.getUserInfo(token).subscribe(
      (result)=>{
        this.userID = result.data.id;
        this.perfilID = result.data.perfil;
        this.getProfile(this.perfilID);

        if(this.socio || this.mozo){
          this.pedidoService.getPedidos().subscribe(
            (result)=>{
              this.pedidos = result
            },
            (error)=>{console.error(error)}
          );
        }

        if(this.cervecero || this.bartender || this.cocinero || this.socio){
          this.pedidoService.getDetallePedidoDashboard(this.userID).subscribe(
            (result)=>{
              console.log(result);
              this.detallesPedidos = result
            },
            (error)=>{console.error(error)}
          );
        }

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
    this.viewPedidos = this.mozo || this.socio;
    this.viewDetallesPedidos = this.cervecero || this.cocinero || this.bartender || this.socio;
  }

  entregaPedido(pedido){
    pedido.estadoPedidoID = 4;
    this.pedidoService.entregaPedido(pedido).subscribe(
      response=>{
        console.log(response);
        this.ngOnInit();
      },
      error=>console.error(error)
    );
  }

  comenzarDetallePedido(detallePedido){

    let time = "1";

    const dialogRef = this.dialog.open(ComenzarDialog, {
      width: '270px',
      data: { time: time }
    });

    dialogRef.beforeClosed().subscribe(result => {
      if(result != undefined){
        detallePedido.tiempoEstimado = parseInt(result.time);
        detallePedido.estadoPedidoID = 2;
        detallePedido.usuarioID = this.userID;
        console.log(detallePedido);
        this.detallePedidoService.updatePedidoDetalle(detallePedido).subscribe(
          result=>{
            console.log(result);
            this.detallesPedidos = result;
          },
          error=>console.error(error)
        );
      }
    });
  }

  finalizarDetallePedido(detallePedido){

    let time = "1";

    const dialogRef = this.dialog.open(FinalizarDialog, {
      width: '270px',
      data: { time: time }
    });

    dialogRef.beforeClosed().subscribe(result => {
      if(result != undefined){
        detallePedido.estadoPedidoID = 3;
        console.log(detallePedido);
        this.detallePedidoService.updatePedidoDetalle(detallePedido).subscribe(
          result=>{
            this.detallesPedidos = result;
          },
          error=>console.error(error)
        );
      }
    });
  }

  verPedido(pedido) {
    this.pedidoService.getDetallePedido(pedido.pedidoID).subscribe(
      (result) => {
        const dialogRef = this.dialog.open(ConsultaDialog, {
          width: '75%',
          data: { items: result, title: pedido.codigoPedido}
        });
      },
      (error) => console.error(error)
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
    @Inject(MAT_DIALOG_DATA) public data: any) {}

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
    @Inject(MAT_DIALOG_DATA) public data: any) {}

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
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
