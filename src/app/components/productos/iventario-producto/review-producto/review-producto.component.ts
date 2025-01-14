import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-review-producto',
  templateUrl: './review-producto.component.html',
  styleUrls: ['./review-producto.component.css']
})
export class ReviewProductoComponent {
  public cargando: false;
  public id: any;
  public producto: any = {};
  public reviews: Array<any> = [];
  public _idUser: any;

  public array_inventario: any = [];
public url;
  //para la paginacion
  public p: number = 1;
  public pageSize = 5;

  constructor( private _route: ActivatedRoute, private _productoService: ProductosService,private _router: Router){

    this._idUser = localStorage.getItem('_id');
    this.url = GLOBAL.url
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

              this.listar_reviews_producto_publico()



            }
        }, err =>{

        })
      }
    );



  }


  listar_reviews_producto_publico(){

    this._productoService.listar_reviews_producto_publico( this.producto._id ).subscribe(
      resp=>{
        this.reviews = resp.data
        console.log(this.reviews);
      },err=>{

      }
    )
  }
}
