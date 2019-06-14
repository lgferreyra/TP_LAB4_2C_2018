import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { environment } from '../../environments/environment';

@Injectable()
export class GeolocationService {

  public apiUrl: string = environment.apiUrl;
  public geoUrl: string = environment.geoUrl;

  constructor(
    private http: Http
  ) { }

  getCoords(address: string):Observable<any>{
    return this.http.get(this.geoUrl + "address=" + address.replace(" ", "+") + "&components=country:AR").map(
      (response: Response)=>{
        console.log(response.json().results[0]);
        return response.json().results[0].geometry.location;
      },
      (error)=>console.log(error)
    );
  }
}
