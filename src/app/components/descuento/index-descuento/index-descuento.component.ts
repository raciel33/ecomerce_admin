import { Component, OnInit } from '@angular/core';
import { DescuentosService } from 'src/app/services/descuentos.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

import Swal from 'sweetalert2';


declare var iziToast: any;

@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.css']
})
export class IndexDescuentoComponent implements OnInit {

  public cargando = true;
  public descuento:any ;
  public total_descuento:number = 0;
  public filtro :any = '';
  public url;



  constructor( private _descuentoServices: DescuentosService){
    this.url = GLOBAL.url

  }
  ngOnInit(): void {

    this.listar_descuentos();
     }


listar_descuentos(){
  this._descuentoServices.listar_descuento( this.filtro).subscribe((resp:any)=>{


    this.descuento = resp.data;

    console.log(this.descuento);

    /**Para establecer el estado del descuento modificamos las fechas a timestamp
     * para hacer la comparativa con la fecha actual
     */
    this.descuento.forEach((element: any ) => {

      var tt_inicio = Date.parse( element.fecha_inicio + "T00:00:00")/1000;
      var tt_fin = Date.parse( element.fecha_fin + "T00:00:00")/1000

      var today = Date.parse( new Date().toString())/1000

      //si ya paso
      if(today > tt_inicio){
        element.estado = 'Expirado'
      }
      //si no ha llegado
      if(today < tt_inicio){
        element.estado = 'Proximamente'
      }
      //si esta vigente
      if(today >= tt_inicio && today <= tt_fin){
        element.estado = 'Vigente'
      }
    });

    this.cargando = false
  })
}


filtrar_descuentos(){
    console.log(this.filtro);
    if(this.filtro){
      this._descuentoServices.listar_descuento(this.filtro).subscribe((resp:any)=>{

        console.log(resp);
        this.descuento = resp.data
        console.log(this.descuento);
      this.cargando= false      }
      ,(err: any)=>{
        console.log(err);

      })

    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese un producto a buscar'
      })

      this.listar_descuentos();
    }
    this.cargando = true;



      }

  reset(){
    this.filtro = '';
       this.listar_descuentos();
      }

delete_descuento( descuento: any){
        Swal.fire({
               title: 'Are you sure?',
               text: `Se va a eliminar a ${descuento.titulo}`,
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
             }).then((result) => {
                if (result.isConfirmed) {
                  this._descuentoServices.delete_descuento( descuento._id ).subscribe(
                         (resp: any) =>{
                           this.listar_descuentos()
                      }, (err: any)=>{

            })
                Swal.fire(
                  'Deleted!',
                  `${descuento.titulo} ha sido eliminado`,
                  'success'
            )
          }
        })

      }
}
