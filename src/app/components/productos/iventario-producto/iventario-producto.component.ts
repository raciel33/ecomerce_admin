import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
declare var iziToast: any;

@Component({
  selector: 'app-iventario-producto',
  templateUrl: './iventario-producto.component.html',
  styleUrls: ['./iventario-producto.component.css']
})
export class IventarioProductoComponent implements OnInit {

  public cargando: false;
  public id: any;
  public producto: any = {};
  public inventario: Array<any> = [];
  public inventarios: any = {};
  public _idUser: any;



  constructor( private _route: ActivatedRoute, private _productoService: ProductosService,private _router: Router){

    this._idUser = localStorage.getItem('_id');

  }

  ngOnInit(): void {
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

              this._productoService.listar_inventario_producto_admin( this.producto._id).subscribe(
                resp=>{
                  console.log(resp);
                  this.inventario = resp.data

                },
                err=>{
                   console.log(err);

                }
              )


            }
        }, err =>{

        })
      }
    );

  }

eliminar_inventario_producto(id:any){
    Swal.fire({
        title: 'Are you sure?',
        text: `Se va a eliminar a este producto`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
       if (result.isConfirmed) {
         this._productoService.eliminar_inventario_producto_admin(id ).subscribe(
                (resp: any) =>{
                  Swal.fire(
                    'Deleted!',
                    `Producto ha sido eliminado`,
                    'success'
                   )
                  this._router.navigate(['/panel/productos'])

             }, (err: any)=>{

   })

       }
    })
  }

  registro_inventario(inventarioForm: any){

    if (inventarioForm.valid) {
      console.log(this.inventarios);

      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._idUser,
        proveedor: inventarioForm.value.proveedor,
      }

      //console.log(data);
      this._productoService.registro_inventario(data).subscribe(
        resp=>{
            console.log(resp);
            iziToast.show({
              title:'OK',
              titleColor:'#0D922A',
              class: 'text-success',
              position: 'topRight',
              message: 'Stock actualizado'
            })
            this._productoService.listar_inventario_producto_admin( this.producto._id).subscribe(
              resp=>{
                console.log(resp);
                this.inventario = resp.data

                this._router.navigate(['/panel/productos'])
              },

              err=>{
                 console.log(err);

              }
            )
         },
        err =>{

        })
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
}
