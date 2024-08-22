import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent {

  public cargando: boolean = false;

  public cliente: any = {
    genero: '',
    password:'123456'
  }


  constructor(private _clientesService: ClienteService, private _router: Router){

  }


  //**/Esto lo tengo que arreglar */
  registro(registroForm: any){
    if( registroForm.valid){

      this.cargando = true;

      this._clientesService.registro_clientes_admin(this.cliente).subscribe(
        resp=>{
              iziToast.success({
                 title: 'OK',
                message: resp.cliente.nombres + ' registrado'
              })
              this.cargando = false;

              this._router.navigateByUrl( '/panel/clientes')


      },err =>{
        iziToast.show({
          title:'ERROR',
          titleColor:'#ff0000',
          class: 'text-danger',
          position: 'topRight',
          message: err.error.msg
        })
      })

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
