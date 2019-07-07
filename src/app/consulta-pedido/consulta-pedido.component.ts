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

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params=>{
        console.log(params);
        this.pedidoService.getPedido(params.get("mesa"), params.get("pedido")).subscribe(
          result=>{
            console.log(result);
            this.pedidoDetalles = result;
            this.pedidoDetalles.forEach(element => {
              this.total = this.total + parseInt(element.precio);
            });
            this.entregado = this.pedidoDetalles[0].estadoPedidoID == 4 ? 1 : 0;
            if(this.entregado == 1 ){
              this.pedidoService.checkEncuenta(this.pedidoDetalles[0].pedidoID).subscribe(
                result=>{
                  if(result.existe == 0){
                    setTimeout((args)=>{
                      const dialogRef = this.dialog.open(PreguntaDialog, {
                        width: '270px',
                        data: { pedidoID: this.pedidoDetalles[0].pedidoID }
                      });
                  
                      /*dialogRef.beforeClosed().subscribe(result => {
                        if (result != undefined) {
                          this.spinner.show();
                          pedido.estadoPedidoID = 5;
                          this.pedidoService.cancelarPedido(pedido).subscribe(
                            result => {
                              console.log(result);
                              this.ngOnInit();
                              this.snackBar.open("El pedido ha sido cancelado", "", { duration: 3000, verticalPosition: 'top' });
                            },
                            error => {
                              console.error(error);
                              this.spinner.hide();
                            },
                            () => this.spinner.hide()
                          );
                        }
                      });*/
                    },3000);
                  }
                },
                error=>console.error(error)
              );
            }
          }
        );

      },
      error=>console.error(error)
    );
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