import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescuentosService {

  public url;

  public clientes: Array<any> = [];



  constructor( private _http: HttpClient) {
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


listar_descuento(filtro: any){

    return this._http.get(`${this.url}/listar_descuentos/`+filtro ,this.headers)



  }

delete_descuento(id: any){


    return this._http.delete(`${this.url}/delete_descuento/${id}`, this.headers)


  }
  //registro_descuento_admin
 registro_descuento_admin(data:any, file: File):Observable<any>{

    let headers = new HttpHeaders({'x-token': this.token})

    console.log( data);

    const formData = new FormData();
    formData.append('titulo', data.titulo );
    formData.append('descuento', data.descuento );
    formData.append('fecha_inicio', data.fecha_inicio );
    formData.append('fecha_fin', data.fecha_fin );
    formData.append('banner', file );


    return this._http.post(`${this.url}/registro_descuento_admin`, formData , { headers: headers })

   }
//

 get_descuento_id( id: any ):Observable<any>{

    return this._http.get(`${this.url}/get_descuento_id/`+id ,this.headers)

   }

   update_descuento_admin(data: any, file:File):Observable<any>{

    let headers = new HttpHeaders({'x-token': this.token})

    console.log(file);

    if( file == undefined){

      return this._http.put(`${this.url}/update_descuento_admin/${data._id}`  , data , this.headers)
    }

    else{
      const formData = new FormData();
      formData.append('titulo', data.titulo );
      formData.append('descuento', data.descuento );
      formData.append('fecha_inicio', data.fecha_inicio );
      formData.append('fecha_fin', data.fecha_fin );
      formData.append('banner', file );


      return this._http.put(`${this.url}/update_descuento_admin/${data._id}`, formData , { headers: headers })

    }

  }

}
