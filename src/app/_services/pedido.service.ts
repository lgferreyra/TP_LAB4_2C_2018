import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';
@Injectable()
export class PedidoService {

  public url: string = environment.apiUrl;

  constructor(
    private http: Http
  ) { }

  getPedido(mesa: string, pedido: string): Observable<any> {
    
    return this.http.get(this.url + "pedido/consulta/" + pedido + "/" + mesa)
      .map((response)=>{
        console.log(response);
        return response.json();
      });
  }

  getPedidosByEstado(estadoPedidoID: string): Observable<any> {
    return this.http.get(this.url + "pedido/estado/" + estadoPedidoID)
      .map((response)=>{
        console.log(response);
        return response.json();
      });
  }

  getDetallePedido(pedidoID: string): Observable<any> {
    return this.http.get(this.url + "pedidoDetalle/pedido/" + pedidoID)
      .map((response)=>{
        console.log(response);
        response.json();
      });
  }
}
