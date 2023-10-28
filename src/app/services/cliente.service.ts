import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';
import { map } from 'jquery';
import { Cliente } from '../models/cliente.model';
@Injectable({
  providedIn: 'root'
})


export class ClienteService {
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

cargarClientes(desde:number = 0){

  const url = `${ this.url}/panel/cliente?desde=${desde}`

  //retornamos la ruta y los headers(token)
  return this._http.get( url ,this.headers)


}



listar_clientes_filtro_admin( tipo: any, filtro: any ):Observable<any>{

 return this._http.get(`${this.url}/listar_clientes_filtro_admin/`+tipo+`/`+filtro,this.headers)

}

registro_clientes_admin(data:any):Observable<any>{

  console.log(data);
  return this._http.post(`${this.url}/registroCliente_admin`, data , this.headers)

 }

 get_cliente_id( id:any){
  return this._http.get(`${this.url}/get_cliente_id/`+id , this.headers)

 }

 update_cliente_admin(cliente: Cliente):Observable<any>{

  return this._http.put(`${this.url}/update_cliente_admin/${cliente._id}`  , cliente , this.headers)

}

borrar_cliente(id: any):Observable<any>{

  console.log(`${id}`);

  return this._http.delete(`${this.url}/delete/${id}`, this.headers)

}




}


