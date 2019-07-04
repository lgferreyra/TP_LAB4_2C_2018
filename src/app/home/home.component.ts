import { Component, OnInit } from '@angular/core';
import { PedidoService } from "../_services/pedido.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  consulta: any = {mesa:"",pedido:""};
  loading: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

  }

  consultar(){
    console.log(this.consulta);
    this.spinner.show();
    this.pedidoService.getPedido(this.consulta.mesa, this.consulta.pedido)
      .subscribe(
        result=>{
          console.log(result);
        },
        error=>{
          console.error(error);
          this.spinner.hide();
        },
        ()=>this.spinner.hide()
      )
  }

}
