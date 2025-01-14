import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

declare var iziToast: any;


@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent implements OnInit {

  public mensajes: Array<any> = [];
  public cargando = true;
  public filtro = '';

  p: number = 1;

  public collection: any[] = [];

  constructor( private _adminService: AdminService) {


  }

  ngOnInit(): void {


    this.obtenerMensajes();


  }

  obtenerMensajes(){
    this._adminService.obtener_mensaje_admin().subscribe(
      (resp: any )=>{
         console.log(resp);
         this.mensajes = resp.data;
         this.cargando = false
      },err=>{

      }
    )
  }

  cerrarMensaje( id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: `Se va a cerrar este mensaje ` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
       if (result.isConfirmed) {
             this._adminService.cerrar_mensaje_admin( id, this.mensajes ).subscribe(
              resp=>{
                  this.obtenerMensajes()
              }
             )
       Swal.fire(
         'Deleted!',
         ` Mensaje ha sido cerrado`,
         'success'
   )
 }
})
  }

  borrar_mensaje_cliente( mensajes: any){

    console.log(mensajes);

    if (mensajes.estado == 'Cerrado') {
      Swal.fire({
        title: 'Are you sure?',
        text: `Se va a eliminar el mensaje de ${mensajes.cliente}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
         if (result.isConfirmed) {
          this._adminService.borrar_mensaje_cliente( mensajes._id).subscribe(
            (resp: any)=>{
                  this.obtenerMensajes()
            },
            err=>{

            }
          )
         Swal.fire(
           'Deleted!',
           `El mensaje de ${mensajes.cliente} ha sido eliminado`,
           'success'
     )
   }
  })
    } else {
      iziToast.show({
        title:'ERROR',
        titleColor:'#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe cerrar el estado del mensaje antes de eliminarlo'
      })
    }





  }
}
