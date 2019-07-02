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
        return response.json();
      });
  }

  getPedidosByEstado(estadoPedidoID: string): Observable<any> {
    return this.http.get(this.url + "pedido/estado/" + estadoPedidoID)
      .map((response)=>{
        return response.json();
      });
  }

  getPedidos(): Observable<any> {
    return this.http.get(this.url + "pedido")
      .map((response)=>{
        return response.json();
      });
  }

  
  getDetallePedidoDashboard(userID: string): Observable<any> {
    return this.http.get(this.url + "pedidoDetalle/dashboard/" + userID)
      .map((response)=>{
        return response.json();
      });
  }

  getDetallePedido(pedidoID: string): Observable<any> {
    return this.http.get(this.url + "pedidoDetalle/pedido/" + pedidoID)
      .map((response)=>{
        return response.json();
      });
  }

  savePedido(pedido: any){
    return this.http.post(this.url + "pedido", pedido).map(
      (response)=>{
        return response.json();
      },
      (error)=>console.error(error)
    );
  }

  entregaPedido(pedido: any){
    return this.http.put(this.url + "pedido/estado", pedido).map(
      (response)=>{
        console.log(response);
        return response.statusText;
      },
      (error)=>console.error(error)
    );
  }

  cancelarPedido(pedido: any){
    return this.http.put(this.url + "pedido/cancelar", pedido).map(
      (response)=>{
        console.log(response);
        return response.statusText;
      },
      (error)=>console.error(error)
    );
  }
}
