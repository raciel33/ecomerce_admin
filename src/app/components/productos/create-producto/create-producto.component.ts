import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { TinyMCE } from 'src/assets/tinymce/tinymce';
import { AdminService } from 'src/app/services/admin.service';


declare var iziToast: any;
declare  var jQuery: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent {


   public producto: any = {
      categoria: ''
   }
   public file: File  ;

   public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';

   public config:any  = {

  }
  public cargando: boolean = false;

  public config_global: any = {};

   constructor( private _productoService: ProductosService,private _router: Router, private _adminService: AdminService){
     this.config = {
       height:500
    };

    this._adminService.obtener_config_public().subscribe(
      (resp:any)=>{
        console.log(resp);
        this.config_global = resp.data
       // console.log(this.config_global);
      },err=>{
         console.log(err);
      }
    )

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
          this._productoService.registro_productos_admin(this.producto, this.file).subscribe(
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

                this._router.navigate(['/panel/productos'])


            },
             err=>{
                  console.log(err);
                  this.cargando = false;

            }
           )
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
