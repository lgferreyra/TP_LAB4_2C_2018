import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from './authentication.service';
import { Usuario } from '../usuario';
import { environment } from '../../environments/environment';
import { Perfil } from '../perfil.enum';
 
@Injectable()
export class UserService {

    public url: string = environment.apiUrl;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    getUsers(): Observable<Usuario[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
 
        // get users from api
        return this.http.get('/api/users', options)
            .map((response: Response) => response.json());
    }

    public getUsersByProfile(perfilID: number): Observable<Usuario[]>{
        return this.http.get(this.url + "usuarios/list/" + perfilID.toString())
            .map(
                (response: Response)=>{
                    let array = response.json(); 
                    array.forEach(element => {
                        element.perfil = Perfil[element.perfilID]
                    });
                    return array;
                },
                (error)=>console.error(error)
            );
    }

    registrarUsuario(usuario: Usuario){
        let data : FormData = new FormData();
        data.append("nombre", usuario.nombre);
        data.append("apellido", usuario.apellido);
        data.append("email", usuario.email);
        data.append("fecha", usuario.fecha.toString());
        data.append("password", usuario.password);
        data.append("foto", usuario.foto);
        data.append("perfilID", usuario.perfilID.toString());
        return this.http.post(this.url + "usuario/crear", data)
            .map((response: Response) => {
                console.log(response);
                response.json();
            });
    }

    public deleteUsuario(id: number): Observable<boolean>{
        console.log(id);
        return this.http.delete(this.url + "usuario/eliminar/" + id)
            .map((response: Response)=>{
                console.log(response);
                return true;
            });
    }

    public getUser(id: number): Observable<Usuario>{
        return this.http.get(this.url + "usuario/" + id)
            .map((response: Response)=>{
                let user = response.json();
                user.perfil = Perfil[user.perfilID];
                return user;
            });
    }
}