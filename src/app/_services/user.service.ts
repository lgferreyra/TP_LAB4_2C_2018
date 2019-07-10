import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { Usuario } from '../usuario';
import { environment } from '../../environments/environment';
import { Perfil } from '../perfil.enum';
import { error } from 'util';

@Injectable()
export class UserService {

    public url: string = environment.apiUrl;

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    public getUsersByProfile(perfilID: number): Observable<Usuario[]> {
        return this.http.get(this.url + "usuarios/list/" + perfilID.toString())
            .map(
                (response: Response) => {
                    let array = response.json();
                    array.forEach(element => {
                        element.perfil = Perfil[element.perfilID]
                    });
                    return array;
                },
                (error) => console.error(error)
            );
    }

    registrarUsuario(usuario: Usuario) {
        return this.http.post(this.url + "usuario/crear", usuario).map(
        (response: Response) => {
            console.log(response);
            response.json();
        },
            error => console.error(error)
        );
    }

    public deleteUsuario(id: number): Observable<boolean> {
        console.log(id);
        return this.http.delete(this.url + "usuario/eliminar/" + id)
            .map((response: Response) => {
                console.log(response);
                return true;
            });
    }

    public getUser(id: number): Observable<Usuario> {
        return this.http.get(this.url + "usuario/" + id)
            .map((response: Response) => {
                let user = response.json();
                user.perfil = Perfil[user.perfilID];
                return user;
            });
    }

    public getReporteAccesos(fechaDesde, fechaHasta) {
        return this.http.get(this.url + "reporte/empleado/accesos", { params: { fechaDesde: fechaDesde, fechaHasta: fechaHasta } })
            .map(
                response => {
                    return response.json();
                },
                error => {
                    console.error(error);
                }
            )
    }

    getUsuarios() {
        return this.http.get(this.url + "usuarios").map(
            (response) => {
                return response.json();
            },
            error => console.log(error)
        );
    }

    eliminarUsuario(usuario) {
        return this.http.post(this.url + "usuario/eliminar", usuario).map(
            response => {
                return response.json();
            },
            error => console.error(error)
        );
    }

    suspenderUsuario(usuario) {
        return this.http.post(this.url + "usuario/suspender", usuario).map(
            response => {
                console.log(response);
                return response.json();
            },
            error => console.error(error)
        );
    }

    getPerfiles() {
        return this.http.get(this.url + "perfiles").map(
            response => {
                return response.json()
            },
            error => console.log(error)
        );
    }
}