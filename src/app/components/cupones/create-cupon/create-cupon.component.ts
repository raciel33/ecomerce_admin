import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast: any;


@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent {

  public cupon: any = {
    tipo: ''
  }

  public cargando = false;

  constructor(private _cuponService: CuponService, private _router: Router){

  }

  registro(registroForm: any){
    if( registroForm.valid){
       this.cargando = true

      this._cuponService.registro_cupon_admin( this.cupon).subscribe(
        resp=>{
          iziToast.show({
            title:'OK',
            titleColor:'#0D922A',
            class: 'text-success',
            position: 'topRight',
            message: 'Producto creado'
          })
          console.log(resp);
          this.cargando = false;

          this._router.navigate(['/panel/cupones'])
        },
      err=>{
         console.log(err);
      })


      this.cargando = true;



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
