import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentosService } from 'src/app/services/descuentos.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import Swal from 'sweetalert2';
declare var iziToast: any;
declare  var jQuery: any;

@Component({
  selector: 'app-edit-descuento',
  templateUrl: './edit-descuento.component.html',
  styleUrls: ['./edit-descuento.component.css']
})
export class EditDescuentoComponent {


  public descuento: any ={};
  public config :any = {};
  public imgSelect: any | ArrayBuffer ;
  public cargando: boolean = false;
  public id: any;
  public url;
  public file: File ;


  constructor(private _route: ActivatedRoute, private _descuentoService: DescuentosService,
    private router: Router, private _adminService: AdminService){

      this.url = GLOBAL.url;

  }

  ngOnInit(): void {

    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._descuentoService.get_descuento_id(this.id).subscribe(
          (resp: any)=>{
            if( resp.data == undefined){

              this.descuento = undefined;

            }else{

              this.descuento = resp.data
              console.log(this.descuento);
              //Imagen del banner del descuento seleccionado para actualizar
              this.imgSelect = this.url + '/get_img_banner_descuento/'+ this.descuento.banner
            }
        }, err =>{

        })
      }
    );

  }

actualizar(actualizarForm:any){

    this.cargando = true;

    if(actualizarForm.valid){

      if (this.descuento.descuento>=1 && this.descuento.descuento<=100) {
            this.cargando = true;
            this._descuentoService.update_descuento_admin( this.descuento, this.file, ).subscribe(
              resp=>{
                console.log(resp);
                Swal.fire('Guardado' , 'Cambios guardados', 'success')//viene del sweetalert2
                this.cargando = false;

                 this.router.navigateByUrl('/panel/descuentos')
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
          message: 'El porcentaje no es válido'
        })
        this.cargando = false;
        }


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
 /**Para la carga de la imagen */
 fileChangeEvent( event: any){
  var file;
   if( event.target.files && event.target.files[0]){
     file =<File>event.target.files[0];

   }else{
     iziToast.show({
       title:'ERROR',
       titleColor:'#ff0000',
       class: 'text-danger',
       position: 'topRight',
       message: 'No hay imagen de envio'
     })

     //si hay error se pone el label con el id=input-portada con este texto por defecto
     $('#input-portada').text('Seleccionar imagen');

     //si hay error carga esta imagen por defecto
     this.imgSelect = 'assets/img/01.jpg';
     this.file = undefined
   }
   //si la imagen es menos a 4MB (es valida)
   if( file.size <= 4000000){

     //si tiene los formatos permitidos es una imagen
     if( file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/webp' ||file.type == 'image/jpeg' ||  file.type == 'image/gif'){

       //cargamos la imagen
       const reader = new FileReader();
       reader.onload = e => this.imgSelect = reader.result;
       reader.readAsDataURL(file);

       //se pone el label con el id=input-portada con este texto
       $('#input-portada').text(file.name)

       this.file = file
       console.log(this.file);

     }else{
       iziToast.show({
         title:'ERROR',
         titleColor:'#ff0000',
         class: 'text-danger',
         position: 'topRight',
         message: 'El archivo debe ser una imagen'
       })

       //si hay error se pone el label con el id=input-portada con este texto por defecto
     $('#input-portada').text('Seleccionar imagen');

     //si hay error carga esta imagen por defecto
     this.imgSelect = 'assets/img/01.jpg';
     this.file = undefined
     }
   }else{
     iziToast.show({
       title:'ERROR',
       titleColor:'#ff0000',
       class: 'text-danger',
       position: 'topRight',
       message: 'La imagen no puede superar 4MB'
     });

      //si hay error se pone el label con el id=input-portada con este texto por defecto
     $('#input-portada').text('Seleccionar imagen');

     //si hay error carga esta imagen por defecto
     this.imgSelect = 'assets/img/01.jpg';
     this.file = undefined
   }

  console.log(this.file);
}
}
