import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductosService } from 'src/app/services/productos.service';
declare var iziToast: any;

@Component({
  selector: 'app-descuento-producto',
  templateUrl: './descuento-producto.component.html',
  styleUrls: ['./descuento-producto.component.css']
})
export class DescuentoProductoComponent {
[x: string]: any;


  public producto: any = {};

  public descuento: any = {
  }
  public url: any

  public cargando = false;
  public id: any;
  public desc = 0;
  public totalPagar =0;

  constructor( private _route: ActivatedRoute,private _productoService: ProductosService

  ){
   this.url = GLOBAL.url;

   this._route.params.subscribe(
     params => {
       this.id = params['id'];

       //console.log(this.id);

       this.init_data()

     }
   );
  }

  init_data(){
    this._productoService.get_producto_id(this.id).subscribe(
      (resp: any)=>{
        if( resp.data == undefined){

          this.producto = undefined;
       //   console.log(this.producto);

        }else{

          this.producto = resp.data

          this.totalPagar = this.producto.precio
          this.desc = (this.totalPagar *  this.producto.descuento)/100;
          this.totalPagar = Math.round(this.totalPagar - this.desc);

            console.log(this.producto.descuento);
               }
    }, err =>{

    })
  }

  registro(registroForm: any){
    this.cargando = true;

   if ( registroForm.valid ) {
            if (this.descuento.descuento>=1 && this.descuento.descuento<=100) {
              this.cargando = true;

              this._productoService.descuento_unico_producto( this.id, this.descuento).subscribe(
                resp=>{
                  iziToast.show({
                    title:'OK',
                    titleColor:'#0D922A',
                    class: 'text-success',
                    position: 'topRight',
                    message: 'Descuento creado'
                  })
                  console.log(resp);
                 this.init_data()
                  this.cargando = false;

                },
                err=>{
                  console.log(err);
                }
              )
            } else {
              iziToast.show({
                title:'ERROR',
                titleColor:'#ff0000',
                class: 'text-danger',
                position: 'topRight',
                message: 'El porcentaje no es válido'
              })
              this.cargando = false;
            }





   } else {
     iziToast.show({
       title:'ERROR',
       titleColor:'#ff0000',
       class: 'text-danger',
       position: 'topRight',
       message: 'Formulario no válido'
     })
     this.cargando = false;

   }
  }

  eliminarDesc( id: any ){

    this.descuento = {
         descuento: 0
    }
       this._productoService.eliminar_descuento_producto( id , this.descuento).subscribe(
        resp=>{
          console.log(resp);
          iziToast.show({
            title:'OK',
            titleColor:'#0D922A',
            class: 'text-success',
            position: 'topRight',
            message: 'Descuento eliminado'
          })

          this.init_data();
        },
        err=>{
          console.log(err);

        }
       )
  }
}
