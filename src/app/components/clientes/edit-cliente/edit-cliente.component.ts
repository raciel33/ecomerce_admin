import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';

declare var iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit{

  public cargando: boolean = false;

  public cliente: any = {

  }
  public id: any;

constructor( private _router: ActivatedRoute, private _clienteService: ClienteService, private router: Router){}

ngOnInit(): void {

   this._router.params.subscribe(
    params =>{
      this.id = params['id'];
      this._clienteService.get_cliente_id(this.id).subscribe(
        (resp: any)=>{
          console.log(resp);
          if( resp.data == undefined){
             this.cliente = undefined
          }else{
            this.cliente = resp.data
          }
      },err=>{

      })
    }
   )

}
  actualizar( updateForm: any){

   this.cargando = true;

        if(updateForm.valid){
          this._clienteService.update_cliente_admin( this.cliente ).subscribe(
            resp=>{
              console.log(resp);
              Swal.fire('Guardado' , 'Cambios guardados', 'success')//viene del sweetalert2
              this.cargando = false;

               this.router.navigateByUrl('/panel/clientes')
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
