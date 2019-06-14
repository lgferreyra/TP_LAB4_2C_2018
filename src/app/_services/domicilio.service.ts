import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Domicilio } from '../domicilio';


@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  public url: string = environment.apiUrl;

  constructor(
    private http: Http
  ) { }

  public saveDomicilio(domicilio: Domicilio): Observable<number> {
    let data: FormData = new FormData();
    data.append("direccion", domicilio.direccion);
    data.append("departamento", domicilio.departamento != null ? domicilio.departamento : null);
    data.append("localidad", domicilio.localidad);
    data.append("longitud", (domicilio.longitud != null && domicilio.longitud != 0) ? domicilio.longitud.toString() : null);
    data.append("latitud", (domicilio.latitud != null && domicilio.latitud != 0) ? domicilio.latitud.toString() : null);
    console.log(domicilio);
    return this.http.post(this.url + "domicilio/crear", data)
      .map((response: Response) => response.json());
  }

  public getDomicilio(id: number): Observable<Domicilio> {
    console.log(id);
    return this.http.get(this.url + "domicilio/" + id.toString())
      .map((response: Response) => response.json());
  }

}
