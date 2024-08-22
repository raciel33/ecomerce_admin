import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public url;

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
  constructor( private _http: HttpClient) {
    this.url = GLOBAL.url
 }

 registro_productos_admin(data:any, file: File):Observable<any>{

  let headers = new HttpHeaders({'x-token': this.token})

  console.log( file);

  const formData = new FormData();
  formData.append('titulo', data.titulo );
  formData.append('stock', data.stock );
  formData.append('precio', data.precio );
  formData.append('categoria', data.categoria );
  formData.append('descripcion', data.descripcion );
  formData.append('portada', file );


  return this._http.post(`${this.url}/registro_producto_admin`, formData , { headers: headers })

 }


listar_productos(desde:number = 0){

  let headers = new HttpHeaders({'x-token': this.token})

  const url = `${this.url}/panel/listar_productos?desde=${desde}`

  //retornamos la ruta y los headers(token)
  return this._http.get( url ,this.headers)


}

filtrar_productos( filtro: any ):Observable<any>{

  return this._http.get(`${this.url}/filtrar_productos/`+filtro ,this.headers)

 }

 get_producto_id( id: any ):Observable<any>{

  return this._http.get(`${this.url}/get_producto_id/`+id ,this.headers)

 }
 update_producto_admin(data: Producto, file:File):Observable<any>{

  let headers = new HttpHeaders({'x-token': this.token})

  console.log(file);

  if( file == undefined){

    return this._http.put(`${this.url}/update_producto_admin/${data._id}`  , data , this.headers)
  }

  else{
    const formData = new FormData();
    formData.append('titulo', data.titulo );
    formData.append('stock', data.stock );
    formData.append('precio', data.precio );
    formData.append('categoria', data.categoria );
    formData.append('descripcion', data.descripcion );
    formData.append('portada', file );


    return this._http.put(`${this.url}/update_producto_admin/${data._id}`, formData , { headers: headers })

  }

}

borrar_producto(id: any):Observable<any>{


  return this._http.delete(`${this.url}/deleteProducto/${id}`, this.headers)

}

listar_inventario_producto_admin(id: any):Observable<any>{


  return this._http.get(`${this.url}/listar_inventario_producto_admin/${id}`, this.headers)

}


eliminar_inventario_producto_admin(id: any):Observable<any>{


  return this._http.delete(`${this.url}/eliminar_inventario_producto_admin/${id}`, this.headers)

}

registro_inventario(data: any):Observable<any>{


  return this._http.post(`${this.url}/registro_inventario`,data, this.headers)

}


}

