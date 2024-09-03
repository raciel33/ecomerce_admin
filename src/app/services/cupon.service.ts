import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';
import { Cupon } from '../models/cupon.model';


@Injectable({
  providedIn: 'root'
})
export class CuponService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url

   }


 get token():string{
  return localStorage.getItem( 'token') || '';
}
  //para extraer los headers(token)
  get headers(){
    return {
      headers: {
        'x-token':this.token //el this.token esta en la funcion get token()
       }
     }
  }

  registro_cupon_admin(data:any):Observable<any>{

    console.log(data);
    return this._http.post(`${this.url}/registro_cupon_admin`, data , this.headers)

   }

   listar_cupones(filtro:any):Observable<any>{

    return this._http.get(`${this.url}/listar_cupones/${filtro}` , this.headers)

   }
   get_cupon_id( id: any ):Observable<any>{

    return this._http.get(`${this.url}/get_cupon_id/`+id ,this.headers)

   }

   borrar_cupon(id: any):Observable<any>{


    return this._http.delete(`${this.url}/deleteCupon/${id}`, this.headers)

  }

   update_cupon_admin(data:Cupon):Observable<any>{

    const formData = new FormData();
    formData.append('codigo', data.codigo );
    formData.append('tipo', data.tipo );
    formData.append('valor', data.valor );
    formData.append('limite', data.limite );




    return this._http.put(`${this.url}/update_cupon_admin/${data._id}`, data, this.headers)

   }
}
