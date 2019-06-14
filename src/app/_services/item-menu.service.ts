import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemMenuService {

  public url: string = environment.apiUrl;

  constructor(
    private http: Http
  ) { }

  getItems(): Observable<any>{
    return this.http.get(this.url + "itemMenu/")
      .map((response)=>{
        console.log(response);
        response.json();
      });
  }
}
