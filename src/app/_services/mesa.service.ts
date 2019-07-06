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
}
