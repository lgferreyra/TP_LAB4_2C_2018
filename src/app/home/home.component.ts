import { Component, OnInit } from '@angular/core';
import { PedidoService } from "../_services/pedido.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  consulta: any = {mesa:"",pedido:""};
  loading: boolean = false;

  constructor(
    private pedidoService: PedidoService
  ) { }

  ngOnInit() {
    
  }

  consultar(){
    console.log(this.consulta);
    this.pedidoService.getPedido(this.consulta.mesa, this.consulta.pedido)
      .subscribe(
        result=>{
          console.log(result);
        }
      )
  }

}
