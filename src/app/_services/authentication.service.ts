import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from "./../../environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    public token: string;
    public url: string = environment.apiUrl;
 
    constructor (
        private http: Http,
        private jwtHelperService: JwtHelperService 
    ) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(email: string, password: string): Observable<boolean> {
        let data: FormData = new FormData();
        data.append("email", email);
        data.append("password",password);
        return this.http.post(this.url + "loginUsuario", data)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json().token;
                let perfilID = response.json().perfilID;
                console.log(token);
                if (token != null) {
                    // set token property
                    this.token = token;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email: email, perfilID: perfilID,token: token }));
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    getProfile(token: any): Observable<number>{
        let data: FormData = new FormData();
        let parsedToken = JSON.parse(token);
        data.append("token", parsedToken.token);
        return this.http.post(this.url + "getProfile", data)
            .map((response: Response) => {
                return response.json();
            });
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('currentUser');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelperService.isTokenExpired(token);
    }
}