import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GLOBAL } from './GLOBAL';
import { Admin } from '../models/admin.model';
import { tap, map, catchError } from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form';
import { JwtHelperService } from '@auth0/angular-jwt';

declare var iziToast: any;

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
get rol() {
  return localStorage.getItem( 'rol') || '';
}

  //guardar en localStorage

  guardarLocalStorage( token:string , rol: string, _id:string){
    localStorage.setItem('token' , token);
    localStorage.setItem('rol' , rol );
    localStorage.setItem('_id' , _id );


  }

/*----------------------------------------------------------------------*/
validarToken( allowedRoles: string[]):boolean{

  const token = this.token;
  const rol = this.rol
 console.log(rol);

  if (!token ) {
    return false;
  }
  try {
      //asi podemos validar un token
       const helper = new JwtHelperService();
       const decodedToken  = helper.decodeToken( token );

       if(!decodedToken){
        console.log('token no valido');
        localStorage.removeItem('token');

         return false;
        }
        if (rol != 'admin'){
          iziToast.show({
            title:'ERROR',
            titleColor:'#ff0000',
            class: 'text-danger',
            position: 'topRight',
            message: 'No tienes permisos de administrador'
          })
          return false;
        }


      } catch (error) {
        localStorage.removeItem('token');

         return false;
     }


    return true;

   }


  constructor( private _http: HttpClient) {
     this.url = GLOBAL.url
  }

  login_admin( formData:LoginForm  ){

    return this._http.post(`${this.url}/login_admin`,formData).pipe(
      tap(( resp: any)=>{
         this.user = resp.adminBD
        console.log(this.user);
        this.guardarLocalStorage(resp.token, resp.adminBD.rol, resp.adminBD._id );
      })
    );
   }


   obtener_config_admin(){
    return this._http.get(`${this.url}/obtener_config_admin` , this.headers)

   }
   actualiza_config_admin( id: any, data: any){

    console.log(data.logo);

    if( data.logo == undefined){
      console.log(data);

      return this._http.put(`${this.url}/actualiza_config_admin/+${id}`  , data , this.headers)
    }

    else{
      const formData = new FormData();
      formData.append('titulo', data.titulo );
      formData.append('serie', data.serie );
      formData.append('correlativo', data.correlativo );
      formData.append('categorias',JSON.stringify(data.categorias));
      formData.append('logo', data.logo );


      return this._http.put(`${this.url}/actualiza_config_admin/+${id}`, formData ,  this.headers )

    }

   }
   obtener_config_public( ){

    return this._http.get(`${this.url}/obtener_config_public`, this.headers)

   }

}
