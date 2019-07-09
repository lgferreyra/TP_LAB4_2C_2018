import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../_services/pedido.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consulta-pedido',
  templateUrl: './consulta-pedido.component.html',
  styleUrls: ['./consulta-pedido.component.css']
})
export class ConsultaPedidoComponent implements OnInit {

  private pedidoDetalles = [];
  private total = 0;
  private entregado = 0;
  private cliente = "";
  private mesa = "";
  private pedido = "";

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(
      params => {
        console.log(params);
        this.pedidoService.getPedido(params.get("mesa"), params.get("pedido")).subscribe(
          result => {
            console.log(result);
            this.pedidoDetalles = result;
            this.pedidoDetalles.forEach(element => {
              this.total = this.total + parseInt(element.precio);
            });
            this.cliente = this.pedidoDetalles[0].nombreCliente;
            this.pedido = this.pedidoDetalles[0].pedido;
            this.mesa = this.pedidoDetalles[0].mesa;
            this.entregado = this.pedidoDetalles[0].estadoPedidoID == 4 ? 1 : 0;
            if (this.entregado == 1) {
              this.pedidoService.checkEncuenta(this.pedidoDetalles[0].pedidoID).subscribe(
                result => {
                  if (result.existe == 0) {
                    setTimeout((args) => {
                      this.encuesta();
                    }, 3000);
                  }
                },
                error => console.error(error)
              );
            }
          }
        );

      },
      error => console.error(error)
    );
  }

  encuesta() {
    const dialogRef = this.dialog.open(PreguntaDialog, {
      width: '40%',
      data: {
        pedidoID: this.pedidoDetalles[0].pedidoID,
        restaurante: 0,
        mesa: 0,
        mozo: 0,
        cocinero: 0,
        comentarios: ""
      }
    });

    dialogRef.beforeClosed().subscribe(
      result => {
        if (result != undefined) {
          console.log(result);
          this.spinner.show();
          this.pedidoService.saveEncuesta(result).subscribe(
            (result) => {
              console.log(result);
              this.snackBar.open("Muchas gracias por su tiempo", "", { duration: 3000, verticalPosition: "bottom" });
              this.ngOnInit();
            },
            error => {
              console.log(error);
              this.snackBar.open("Ha ocurrido un problema", "", { duration: 3000, verticalPosition: "bottom" });
              this.spinner.hide();
            },
            () => this.spinner.hide()
          );
        }
      });
  }

}

@Component({
  selector: 'pregunta-dialog',
  templateUrl: 'pregunta-dialog.html',
})
export class PreguntaDialog {

  constructor(
    public dialogRef: MatDialogRef<PreguntaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}