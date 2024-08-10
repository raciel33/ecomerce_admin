import { Component , OnInit} from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from 'src/app/models/producto.model';
import Swal from 'sweetalert2';

declare var iziToast: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {



  public cargando = true;
  public productos:any ;
  public totalProductos:number = 0;
  public filtro :any = '';
  public url;
  public desde:number = 0;//para la paginacion



  constructor( private _productosServices: ProductosService){
    this.url = GLOBAL.url

  }

  ngOnInit(): void {

   this.listar_productos();
    }

//ARREGLAR PAGINATION

 listar_productos(){
      this._productosServices.listar_productos(this.desde).subscribe((resp:any)=>{
        this.productos = resp.productos;
        this.totalProductos = resp.total
        this.cargando = false
      })
    }

 //para la pagination
 cambiarPagina( valor:number){

  this.desde += valor;

  if ( this.desde < 0){
       this.desde = 0;

  }else if( this.desde >= this.totalProductos ){
        this.desde -= valor
  }

  this.listar_productos();
}


  filtrar_productos(){
    console.log(this.filtro);
    if(this.filtro){
      this._productosServices.filtrar_productos(this.filtro).subscribe((resp:any)=>{
        this.productos = resp.data
        console.log(this.productos);
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

      this.listar_productos();
    }
    this.cargando = true;



      }

  reset(){
    this.filtro = '';
       this.listar_productos();
      }



  borrarProducto( producto: Producto){



        Swal.fire({
               title: 'Are you sure?',
               text: `Se va a eliminar a ${producto.titulo}`,
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
             }).then((result) => {
                if (result.isConfirmed) {
                  this._productosServices.borrar_producto( producto._id ).subscribe(
                         (resp: any) =>{
                           this.listar_productos()
                      }, (err: any)=>{

            })
                Swal.fire(
                  'Deleted!',
                  `${producto.titulo} ha sido eliminado`,
                  'success'
            )
          }
        })

      }


    }


