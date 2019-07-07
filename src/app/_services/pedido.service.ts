import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

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
      },
      (error)=>console.error(error));
  }

  existePedido(mesa: string, pedido: string): Observable<any> {
    
    return this.http.get(this.url + "pedido/existe/" + pedido + "/" + mesa)
      .map((response)=>{
        return response.json();
      },
      (error)=>console.error(error));
  }

  getPedidosByEstado(estadoPedidoID: string): Observable<any> {
    return this.http.get(this.url + "pedido/estado/" + estadoPedidoID)
      .map((response)=>{
        return response.json();
      },
      (error)=>console.error(error));
  }

  getPedidos(): Observable<any> {
    return this.http.get(this.url + "pedido")
      .map((response)=>{
        return response.json();
      },
      (error)=>console.error(error));
  }

  
  getDetallePedidoDashboard(userID: string): Observable<any> {
    return this.http.get(this.url + "pedidoDetalle/dashboard/" + userID)
      .map((response)=>{
        return response.json();
      },
      (error)=>console.error(error));
  }

  getDetallePedido(pedidoID: string): Observable<any> {
    return this.http.get(this.url + "pedidoDetalle/pedido/" + pedidoID)
      .map((response)=>{
        return response.json();
      },
      (error)=>console.error(error));
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

  checkEncuenta(pedidoID){
    return this.http.get(this.url + "pedido/encuenta/check/" + pedidoID).map(
      response=>{
        return response.json();
      },
      error=>console.error(error)
    );
  }

  reporteEmpleadoOperaciones(fechaDesde, fechaHasta){
    return this.http.get(this.url + "reporte/empleado/operaciones", {params:{fechaDesde:fechaDesde,fechaHasta:fechaHasta}})
      .map(
        response=>{
            let labelsBySector = [];
            let dataBySector = [];
            let labelsByEmpleado = [];
            let dataByEmpleado = [];
            let json = response.json();

            json.bySector.forEach(element => {
              labelsBySector.push(element.nombre);
              dataBySector.push(element.operaciones);
            });

            json.byEmpleado.forEach(element => {
              labelsByEmpleado.push(element.nombre);
              dataByEmpleado.push(element.operaciones);
            });

            return {bySector: {data: dataBySector, labels: labelsBySector},
                    byEmpleado: {data: dataByEmpleado, labels: labelsByEmpleado}};
        },
        error=>{
            console.error(error);
        }
    );
  }

  reportePedidoVentas(fechaDesde, fechaHasta){
    return this.http.get(this.url + "reporte/pedido/ventas", {params:{fechaDesde:fechaDesde,fechaHasta:fechaHasta}})
      .map(
        response=>{
            let labelsMas = [];
            let dataMas = [];
            let labelsMenos = [];
            let dataMenos = [];
            let json = response.json();

            json.mas.forEach(element => {
              labelsMas.push(element.nombre);
              dataMas.push(element.cantidad);
            });

            json.menos.forEach(element => {
              labelsMenos.push(element.nombre);
              dataMenos.push(element.cantidad);
            });

            return {mas: {data: dataMas, labels: labelsMas},
                    menos: {data: dataMenos, labels: labelsMenos}};
        },
        error=>{
            console.error(error);
        }
    );
  }

  reportePedidoDemorados(fechaDesde, fechaHasta){
    return this.http.get(this.url + "reporte/pedido/demorados", {params:{fechaDesde:fechaDesde,fechaHasta:fechaHasta}})
      .map(
        response=>{
            let labels = [];
            let cantidad = [];
            let demorados = [];
            let json = response.json();

            json.forEach(element => {
              labels.push(element.nombre);
              cantidad.push(element.cantidad);
              demorados.push(element.demorados);
            });

            return {labels:labels, data:[{ data: cantidad, label: 'Cantidad' },{ data: demorados, label: 'Demorados' }]};
        },
        error=>{
            console.error(error);
        }
    );
  }

  reportePedidoCancelados(fechaDesde, fechaHasta){
    return this.http.get(this.url + "reporte/pedido/cancelados", {params:{fechaDesde:fechaDesde,fechaHasta:fechaHasta}})
      .map(
        response=>{
            let json = response.json();
            let completados:number = json[0].completados;
            let cancelados:number = json[0].cancelados;
            let data:number[] = [completados,cancelados]
            return {labels:['Completados', 'Cancelados'], data:data};
        },
        error=>{
            console.error(error);
        }
    );
  }
}
