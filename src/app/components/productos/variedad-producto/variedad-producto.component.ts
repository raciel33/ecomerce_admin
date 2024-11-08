import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductosService } from 'src/app/services/productos.service';
declare var iziToast: any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent {
 public producto: any = {};
 public id: any;
 public nueva_variedad: any = [];
 public cargando: boolean = false;
 public url: any


 constructor( private _route: ActivatedRoute,private _productoService: ProductosService

 ){
  this.url = GLOBAL.url;

  this._route.params.subscribe(
    params => {
      this.id = params['id'];

      console.log(this.id);

      this._productoService.get_producto_id(this.id).subscribe(
        (resp: any)=>{
          if( resp.data == undefined){

            this.producto = undefined;
            console.log(this.producto);

          }else{

            this.producto = resp.data

              console.log(this.producto);
          }
      }, err =>{

      })
    }
  );
 }

 agregarVariedad(){
   if( this.nueva_variedad.length > 0){
    //agregamos la nueva variedad a este producto
    this.producto.variedades.push({titulo:this.nueva_variedad});

    this.nueva_variedad = '';

   }
   else{
    iziToast.show({
      title:'ERROR',
      titleColor:'#ff0000',
      class: 'text-danger',
      position: 'topRight',
      message: 'Debe introducir una variedad'
    })
   }
 }

 eliminar_variedad(idx: any){
  this.producto.variedades.splice( idx, 1)
}

actualizarVariedad(){
  this.cargando = true;

  //Comprobacion de que los inputs se han rellenados
  if( this.producto.titulo_variedad){
    if (this.producto.variedades.length >=1) {

      //se manda el id y los campos de variedades del producto
      this._productoService.update_producto_variedades( this.id,
        {
          titulo_variedad: this.producto.titulo_variedad,
          variedades: this.producto.variedades
        }
      ).subscribe(
        resp=>{
           console.log(resp);
           iziToast.show({
            title:'OK',
            titleColor:'#0D922A',
            class: 'text-success',
            position: 'topRight',
            message: 'Variedad actualizada'
          })

          this.cargando = false;

        },err=>{

        }
      )

    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe introducir al menos una variedad'
      })

  }

}else{
  iziToast.show({
    title:'ERROR',
    titleColor:'#ff0000',
    class: 'text-danger',
    position: 'topRight',
    message: 'Debe introducir titulo de la  variedad'
  })
}
}
}
