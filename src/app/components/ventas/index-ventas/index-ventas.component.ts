import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css']
})
export class IndexVentasComponent implements OnInit{

  public  desde : any;
  public  hasta : any;

  //para la paginacion
  public p: number = 1;
  public pageSize = 5;

  public ventas : Array<any>= [];


  constructor( private _adminService: AdminService, ){


  }
  ngOnInit(): void {

    this._adminService.get_ventas_admin( this.desde, this.hasta ).subscribe(
      (resp: any )=>{
        console.log(resp);
           this.ventas = resp.data
      }
    )

  }

  filtrar(){
    this._adminService.get_ventas_admin( this.desde, this.hasta ).subscribe(
      (resp : any )=>{
        this.ventas = resp.data
      }
    )
  }
}
