import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  public url: string = environment.apiUrl;

  constructor(
    private http: Http
  ) { }
  
  updatePedidoDetalle(detallePedido){
    return this.http.put(this.url + "pedidoDetalle/estado", detallePedido).map(
      (response)=>{
        return response.json();
      },
      (error)=>console.error(error)
    );
  }
}
