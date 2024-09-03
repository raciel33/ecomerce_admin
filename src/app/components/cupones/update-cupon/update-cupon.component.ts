import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';
import Swal from 'sweetalert2';

declare var iziToast: any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent {

  public cupon: any = {
    tipo: ''
  }

  public cargando = false;

  public id: any;


  constructor( private _cuponService: CuponService, private router: Router, private _route: ActivatedRoute) {


  }

  ngOnInit(): void {

    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._cuponService.get_cupon_id(this.id).subscribe(
          (resp: any)=>{
            if( resp.data == undefined){

              this.cupon = undefined;

            }else{

              this.cupon = resp.data
              console.log(this.cupon);

            }
        }, err =>{

        })      }
    );

  }

  actualizar(actualizarForm:any){

    this.cargando = true;

    if(actualizarForm.valid){


      this._cuponService.update_cupon_admin(this.cupon ).subscribe(
         resp=>{
          console.log(resp);
          Swal.fire('Guardado' , 'Cambios guardados', 'success')//viene del sweetalert2
          this.cargando = false;

           this.router.navigateByUrl('/panel/cupones')
        },
        error =>{
          console.log(error);
          Swal.fire('Error',error.error.msg, 'error');
          this.cargando = false;

        }
      )
    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Formulario no válido'
      })
    }
  }
}
