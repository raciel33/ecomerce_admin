import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';
import { Cupon } from 'src/app/models/cupon.model';
import Swal from 'sweetalert2';


declare var iziToast: any;
@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit{

  public cupones: Array<any> = [];
  public cargando = false;
  public filtro = '';

  p: number = 1;

  public collection: any[] = [];

  constructor( private _cuponService: CuponService) {


  }
  ngOnInit(): void {

    this.listar_cupones();


    }

  listar_cupones(){
      this._cuponService.listar_cupones(this.filtro).subscribe(
        resp=>{
          this.cupones = resp.data
          console.log(this.cupones);
        },
        err=>{
          console.log(err);
        }
      )
  }

  filtrar_cupones(){
    console.log(this.filtro);
    if(this.filtro){
      this._cuponService.listar_cupones(this.filtro).subscribe((resp:any)=>{
        this.cupones = resp.data
        console.log(this.cupones);
      this.cargando= false      }
      ,(err: any)=>{
        console.log(err);

      })

    }else{

      this.listar_cupones();
      this.cargando = false;
    }



      }


      borrarCupon( cupon: Cupon){



        Swal.fire({
               title: 'Are you sure?',
               text: `Se va a eliminar e cupon con código ${cupon.codigo}`,
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
             }).then((result) => {
                if (result.isConfirmed) {
                  this._cuponService.borrar_cupon( cupon._id ).subscribe(
                         (resp: any) =>{
                           this.listar_cupones()
                      }, (err: any)=>{

            })
                Swal.fire(
                  'Deleted!',
                  `${cupon.codigo} ha sido eliminado`,
                  'success'
            )
          }
        })

      }
}
