import { Component , OnInit} from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from 'src/app/models/producto.model';
//PARA EXPORTAR A EXCEL
import { Workbook } from 'exceljs';
import  * as fs from 'file-saver';


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

  public array_productos: any = [];


  constructor( private _productosServices: ProductosService){
    this.url = GLOBAL.url

  }

  ngOnInit(): void {

   this.listar_productos();
    }


 listar_productos(){
      this._productosServices.listar_productos(this.desde).subscribe((resp:any)=>{
        this.productos = resp.productos;
        //console.log(this.productos);
        this.totalProductos = resp.total

        //se añaden en this.array_productos los campos que se exportan a excel
        this.productos.forEach((element: any ) => {
           this.array_productos.push({
              titulo: element.titulo,
              stock: element.stock,
              precio: element.precio,
              categoria: element.categoria,
              n_ventas: element.n_ventas
           })

        });

        console.log(this.array_productos);
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

//Descarga de un excel con los productos
donwload_excel(){
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet("Reporte de productos");

        worksheet.addRow(undefined);
        for (let x1 of this.array_productos){
          let x2=Object.keys(x1);

          let temp=[]
          for(let y of x2){
            temp.push(x1[y])
          }
          worksheet.addRow(temp)
        }

        let fname='REP01- ';

        worksheet.columns = [
          { header: 'Producto', key: 'col1', width: 30},
          { header: 'Stock', key: 'col2', width: 15},
          { header: 'Precio', key: 'col3', width: 15},
          { header: 'Categoria', key: 'col4', width: 25},
          { header: 'N° ventas', key: 'col5', width: 15},
        ]as any;

        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
        });

        iziToast.show({
          title:'OK',
          titleColor:'#0D922A',
          class: 'text-success',
          position: 'topRight',
          message: 'Excel descargado correctamente'
         }
       )
      }





    }


