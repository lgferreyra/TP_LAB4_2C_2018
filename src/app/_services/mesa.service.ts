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
}
