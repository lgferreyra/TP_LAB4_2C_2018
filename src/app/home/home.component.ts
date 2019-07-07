import { Component, OnInit } from '@angular/core';
import { PedidoService } from "../_services/pedido.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'util';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  consulta: any = {mesa:"",pedido:""};
  loading: boolean = false;

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

  }

  consultar(){
    console.log(this.consulta);
    this.spinner.show();
    this.pedidoService.existePedido(this.consulta.mesa, this.consulta.pedido)
      .subscribe(
        result=>{
          if(result.existe == 1){
            this.router.navigate(["/consultaPedido", this.consulta.pedido, this.consulta.mesa]);
          } else {
            this.snackBar.open("No se encontro su pedido. Verifique los datos", "", { duration: 3000, verticalPosition: 'top' });
          }
        },
        error=>{
          console.error(error);
          this.spinner.hide();
        },
        ()=>this.spinner.hide()
      )
  }

}
