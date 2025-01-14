import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent {

  public detail_order:Array<any>= [];
  public order: any = {};
  public cargando = true;
  public id: any;
  public url;
  public totaStarts = 5;
  public review: any = {};


  constructor( private _route: ActivatedRoute, private _clienteService: ClienteService){

    this.url = GLOBAL.url;

    this._route.params.subscribe(
      params=>{
        this.id = params['id']
      }
    )
}


ngOnInit(): void {
  this.get_detail_order_cliente()


}

get_detail_order_cliente(){
 // console.log(this.id);
  this._clienteService.get_detail_order_cliente( this.id ).subscribe(
    (resp: any)=>{
      console.log(resp);
         if (resp.data!= undefined) {

           this.order = resp.data;



           this.detail_order = resp.detail_venta;
           this.cargando = false;

         } else {

           this.order = undefined;
         }

         console.log(this.detail_order);

    },
    err=>{
      console.log(err);

    }
  )
}
}
