import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { v4 as uuidv4 } from 'uuid';
import { GLOBAL } from 'src/app/services/GLOBAL';
import Swal from 'sweetalert2';

declare var iziToast: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  public config: any = {};

  public icono_categoria: string = '';
  public titulo_categoria: string = '';

  public file : File = undefined;
  public imgSelect: any | ArrayBuffer ;
  public url;


  constructor( private _adminService: AdminService){

    this.url = GLOBAL.url;

    this._adminService.obtener_config_admin().subscribe(
      (resp:any)=>{
         console.log(resp);
         this.config = resp.data;
         this.imgSelect = this.url+ '/getLogo/' + this.config.logo;
      },
      (err: any)=>{
        console.log(err);

      }
    )
  }


  agregarCategoria(){
    if( this.icono_categoria && this.titulo_categoria){
      console.log(uuidv4());
      this.config.categorias.push({
        titulo: this.titulo_categoria,
        icono: this.icono_categoria,
        _id: uuidv4()// viene del paquete npm install uuid para darle un id

      });
      this.icono_categoria = '';
      this.titulo_categoria = '';

    }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ingresar un titulo e icono para la categoria '
      })    }
  }

  actulizar(configForn: any){

     if(configForn.valid){
       let data = {
        titulo: configForn.value.titulo,
        serie: configForn.value.serie,
        correlativo: configForn.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
       }

       console.log(data);

       this._adminService.actualiza_config_admin("66dd4b3812a1df431d7ffe96", data).subscribe(
        resp=>{
          console.log(resp);
          Swal.fire('Guardado' , 'Cambios guardados', 'success')//viene del sweetalert2

        },
        err =>{

        }
       )


     }else{
      iziToast.show({
        title:'ERROR',
        titleColor:'#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete el formulario correctamente '
      })    }
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
       //para que se muestre la imgagen previa
      $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbail rounded');
      $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
       reader.readAsDataURL(file);

       //se pone el label con el id=input-portada con este texto
       $('#input-portada').text(file.name)


       this.file = file

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

//para que se muestre la imgagen previa
ngDoCheck(): void {
  $('.cs-file-drop-preview').html("<img src ="+ this.imgSelect + ">")

}


eliminar_categoria(idx: any){
   this.config.categorias.splice( idx, 1)
}
  }

