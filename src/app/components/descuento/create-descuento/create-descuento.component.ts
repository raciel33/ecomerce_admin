import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DescuentosService } from 'src/app/services/descuentos.service';
declare var iziToast: any;
declare  var jQuery: any;


@Component({
  selector: 'app-create-descuento',
  templateUrl: './create-descuento.component.html',
  styleUrls: ['./create-descuento.component.css']
})
export class CreateDescuentoComponent {

  public descuento: any = {
 }
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';

  public cargando: boolean = false;
  public file: File  ;



  constructor( private _descuentoService: DescuentosService,private _router: Router, ){


}
registro(registroForm: any){
  this.cargando = true;

 if ( registroForm.valid ) {
     if ( this.file == undefined) {
       iziToast.show({
         title:'ERROR',
         titleColor:'#ff0000',
         class: 'text-danger',
         position: 'topRight',
         message: 'Debe subir una portada '
       })
       this.cargando = false;

     } else {
          if (this.descuento.descuento>=1 && this.descuento<=100) {
            this.cargando = true;
                  this._descuentoService.registro_descuento_admin(this.descuento, this.file).subscribe(
                    resp=>{
                         iziToast.show({
                          title:'OK',
                          titleColor:'#0D922A',
                          class: 'text-success',
                          position: 'topRight',
                          message: 'Descuento creado'
                        })
                        console.log(resp);
                        this.cargando = false;

                        this._router.navigate(['/panel/descuentos'])


                    },
                     err=>{
                          console.log(err);
                          this.cargando = false;

                    }
                   )
          } else {
            iziToast.show({
              title:'ERROR',
              titleColor:'#ff0000',
              class: 'text-danger',
              position: 'topRight',
              message: 'El porcentaje no es válido'
            })
            this.cargando = false;
          }
     }




 } else {
   iziToast.show({
     title:'ERROR',
     titleColor:'#ff0000',
     class: 'text-danger',
     position: 'topRight',
     message: 'Formulario no válido'
   })
   this.cargando = false;

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
