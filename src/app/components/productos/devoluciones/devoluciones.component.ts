import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {

  public cargando = false;
  p: number = 1;
  public pageSize = 5;

  public dev : any;
  public url;

  constructor( private _adminServices: AdminService){
    this.url = GLOBAL.url

  }


  ngOnInit(): void {

    this.initData()
  }



  initData(){
    this.cargando = true
    this._adminServices.obtener_devoluciones().subscribe(
      (resp: any )=>{
        console.log(resp);
        this.dev = resp.data

        this.cargando = false
      }
    )
  }


  aceptar_devolucion( id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: `Se va a aceptar la devolucón de este producto ` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
       if (result.isConfirmed) {
             this._adminServices.aceptar_devolucion( id, this.dev ).subscribe(
              resp=>{
                Swal.fire(
                  'Deleted!',
                  ` Devolucion aceptada`,
                  'success'
            )
                  this.initData()
              },
              err=>{
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: 'Error, algo va mal...',
                });
              }
             )

 }
})
  }


  denegar_devolucion( id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: `Pongase en contacto con el cliente y explique el motivo ` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
       if (result.isConfirmed) {
             this._adminServices.denegar_devolucion( id, this.dev ).subscribe(
              resp=>{
                Swal.fire(
                  'Deleted!',
                  `Devolución denegada`,
                  'success'
            )
                  this.initData()
              },
              err=>{
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: 'Error, algo va mal...',
                });
              }
             )

 }
})
  }

}
