import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  public url: string = environment.apiUrl;

  constructor(
    private http: Http
  ) { }

  getMesas():Observable<any>{
    return this.http.get(this.url + "mesas")
      .map((response)=>{
        return response.json();
      });
  }

  reporteMesaUsos(fechaDesde, fechaHasta){
    return this.http.get(this.url + "reporte/mesa/usos", {params:{fechaDesde:fechaDesde,fechaHasta:fechaHasta}})
      .map(
        response=>{
            let labelsMas = [];
            let dataMas = [];
            let labelsMenos = [];
            let dataMenos = [];
            let json = response.json();

            json.mas.forEach(element => {
              labelsMas.push(element.codigo);
              dataMas.push(element.usos);
            });

            json.menos.forEach(element => {
              labelsMenos.push(element.codigo);
              dataMenos.push(element.usos);
            });

            return {mas: {data: dataMas, labels: labelsMas},
                    menos: {data: dataMenos, labels: labelsMenos}};
        },
        error=>{
            console.error(error);
        }
    );
  }

  reporteMesaTopFacturaciones(fechaDesde, fechaHasta){
    return this.http.get(this.url + "reporte/mesa/topfacturaciones", {params:{fechaDesde:fechaDesde,fechaHasta:fechaHasta}})
      .map(
        response=>{
            let labelsMas = [];
            let dataMas = [];
            let labelsMenos = [];
            let dataMenos = [];
            let json = response.json();

            json.mas.forEach(element => {
              labelsMas.push(element.codigo);
              dataMas.push(element.facturado);
            });

            json.menos.forEach(element => {
              labelsMenos.push(element.codigo);
              dataMenos.push(element.facturado);
            });

            return {mas: {data: dataMas, labels: labelsMas},
                    menos: {data: dataMenos, labels: labelsMenos}};
        },
        error=>{
            console.error(error);
        }
    );
  }

  reporteMesaImportes(fechaDesde, fechaHasta){
    return this.http.get(this.url + "reporte/mesa/importes", {params:{fechaDesde:fechaDesde,fechaHasta:fechaHasta}})
      .map(
        response=>{
            let labels = [];
            let data = [];
            let json = response.json();

            if(json.length == 0){
              labels.push("No hay datos");
              data.push(0);
  
              labels.push("No hay datos");
              data.push(0);
  
              return {labels:labels, data:[{ data: data[0], label: 'Importe' },{ data: data[1], label: 'Importe' }]};
            } else if (json.length == 1) {
              labels.push("Mesa máximo: " + json[0].mesa);
              data.push(json[0].total);
  
              labels.push("Mesa Mínimo: " + json[0].mesa);
              data.push(json[0].total);
  
              return {labels:labels, data:[{ data: data[0], label: 'Importe' },{ data: data[1], label: 'Importe' }]};
            } else {
              labels.push("Mesa máximo: " + json[0].mesa);
              data.push(json[0].total);
  
              labels.push("Mesa Mínimo: " + json[1].mesa);
              data.push(json[1].total);
  
              return {labels:labels, data:[{ data: data[0], label: 'Importe' },{ data: data[1], label: 'Importe' }]};
            }
            
        },
        error=>{
            console.error(error);
        }
    );
  }

  reporteMesaFacturaciones(fechaDesde, fechaHasta){
    return this.http.get(this.url + "reporte/mesa/facturaciones", {params:{fechaDesde:fechaDesde,fechaHasta:fechaHasta}})
      .map(
        response=>{
            let labels = [];
            let data = [];
            let json = response.json();

            json.forEach(element => {
              labels.push(element.codigo);
              data.push(element.facturado);
            });

            return {data: data, labels: labels};
        },
        error=>{
            console.error(error);
        }
    );
  }

  reporteMesaComentarios(fechaDesde, fechaHasta){
    return this.http.get(this.url + "reporte/mesa/comentarios", {params:{fechaDesde:fechaDesde,fechaHasta:fechaHasta}})
      .map(
        response=>{
            let labels = [];
            let cocinero = {data:[],label:"Cocinero"};
            let restaurante = {data:[],label:"Restaurante"};
            let mesa = {data:[],label:"Mesa"};
            let mozo = {data:[],label:"Mozo"};
            let promedio = {data:[],label:"Promedio"};
            let json = response.json();

            json.forEach(element => {
              labels.push(element.codigo);
              cocinero.data.push(element.cocinero);
              restaurante.data.push(element.restaurante);
              mesa.data.push(element.mesa);
              mozo.data.push(element.mozo);
              promedio.data.push(element.promedio);
            });

            return {data: [cocinero, restaurante, mesa, mozo, promedio], labels: labels};
        },
        error=>{
            console.error(error);
        }
    );
  }
}
