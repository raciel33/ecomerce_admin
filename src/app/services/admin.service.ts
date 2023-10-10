import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GLOBAL } from './GLOBAL';
import { Admin } from '../models/admin.model';
import { tap, map, catchError } from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

public user : any;
public url;
public admin!: Admin;


  //Para extraer el token
get token():string{
  return localStorage.getItem( 'token') || '';
}
//para extraer el uid del usuario
get uid():string{
  return this.admin.uid || '';
}

//para extraer los headers(token)
get headers(){
  return {
    headers: {
      'x-token':this.token //el this.token esta en la funcion get token()
     }
   }
}

//extraemos el role del usuario
get rol(){
  return localStorage.getItem( 'rol') || '';
}

  //guardar en localStorage

  guardarLocalStorage( token:string, rol:string ){
    localStorage.setItem('token' , token);
    localStorage.setItem('rol' , rol );

  }



  constructor( private _http: HttpClient) {
     this.url = GLOBAL.url
  }

  login_admin( formData:LoginForm  ){

    return this._http.post(`${this.url}/login_admin`,formData).pipe(
      tap(( resp: any)=>{
        this.user = resp.adminBD
        this.guardarLocalStorage(resp.token, resp.adminBD.rol );
      })
    );
   }

   public isAuthenticated( allowedRoles: string []): boolean {

    const token = this.token;
    const rol = this.rol;

    if (!token) {
      return false;
    }
    try {
        //asi podemos validar un token
         const helper = new JwtHelperService();
         const decodedToken  = helper.decodeToken( token );

         if(!decodedToken){
          console.log('token no valido');
          localStorage.removeItem('token')
           return false;
          }
        } catch (error) {
          localStorage.removeItem('token')
           return false;
       }
      return true;
   }
}
