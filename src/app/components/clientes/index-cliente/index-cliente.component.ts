import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit{

  public cargando: boolean = true;

  public clientes:any = [];
  public filtro_apellido: string = '';
  public filtro_email: string = ''
  public desde:number = 0;//para la paginacion
  public contador:number = 0;
  public totalClientes:number = 0;


  constructor( private _clientesServices: ClienteService){

  }

  ngOnInit(): void {

  this.listar_todos_clientes()


  }




  listar_todos_clientes(){

    this.cargando = true;

    this._clientesServices.cargarClientes( this.desde ).subscribe( (resp:any) => {

      this.clientes = resp.clientes
      this.totalClientes  = resp.total
      this.cargando = false;

      console.log(this.totalClientes);

    })
  }

  //para la pagination
  cambiarPagina( valor:number){

    this.desde += valor;

    if ( this.desde < 0){
         this.desde = 0;

    }else if( this.desde >= this.totalClientes ){
          this.desde -= valor
    }

    this.listar_todos_clientes();
 }

/**Busqueda por apellidos o por email */
  filtro( tipo: any ){
    this.cargando = true;

    if (tipo =='apellidos') {
       if( this.filtro_apellido ){
         this._clientesServices.listar_clientes_filtro_admin( tipo, this.filtro_apellido).subscribe( resp =>{
           this.clientes = resp.data
           this.cargando = false;

          }
         , err=>{

         })

       }else{
        this.listar_todos_clientes()
       }
    }
    else if( tipo == 'email'){
    if(this.filtro_email){
      this._clientesServices.listar_clientes_filtro_admin( tipo, this.filtro_email).subscribe( resp =>{
        this.clientes = resp.data;
        this.cargando = false;

       }
      , err=>{

      })

    }else{
     this.listar_todos_clientes()
    }
    }
    }

 borrarCliente( cliente: Cliente){

  console.log(cliente._id);


  Swal.fire({
         title: 'Are you sure?',
         text: `Se va a eliminar a ${cliente.nombres}`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
       }).then((result) => {
          if (result.isConfirmed) {
            this._clientesServices.borrar_cliente( cliente._id ).subscribe(
                   (resp: any) =>{
                     this.listar_todos_clientes()
                }, (err: any)=>{

      })
          Swal.fire(
            'Deleted!',
            `${cliente.nombres} ha sido eliminado`,
            'success'
      )
    }
  })

}

  }


