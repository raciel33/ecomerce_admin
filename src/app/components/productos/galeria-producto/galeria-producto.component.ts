import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast: any;
declare var tns: any;
declare var lightGallery:any

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {
  public producto: any = {};
  public id: any;
  public nueva_variedad: any = [];
  public cargando: boolean = false;
  public url: any;

  public file : File = undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public galeria_img: Array<any> = [];

  constructor( private _route: ActivatedRoute,private _productoService: ProductosService


  ){

    console.log(this.imgSelect);
   this.url = GLOBAL.url;

   this._route.params.subscribe(
     params => {
       this.id = params['id'];

       console.log(this.id);

       this.init_data();

     }
   );
  }

  ngOnInit(): void {


  }

  init_data(){
     this.file = undefined;
    this._productoService.get_producto_id(this.id).subscribe(
      (resp: any)=>{
        if( resp.data == undefined){

          this.producto = undefined;
          console.log(this.producto);

          this.galeria_img = this.producto.galeria

        }else{

          this.producto = resp.data

            console.log(this.producto);
        }
    }, (err: any) =>{

    })

  }
  agregarImagen(){

    if (this.file != undefined) {
      console.log(uuidv4());
      let data = {
        imagen: this.file,
        _id: uuidv4()// viene del paquete npm install uuid para darle un id
      }
      console.log(data);

      this._productoService.agregar_img_galeria_admin( this.id, data).subscribe(
        resp=>{
             console.log(resp);
             iziToast.show({
               title:'OK',
               titleColor:'#0D922A',
               class: 'text-success',
               position: 'topRight',
               message: 'Imagen subida correctamente'
              }
            )

          }, err=>{
          }
        )

        this.init_data();
        this.imgSelect = 'assets/img/01.jpg';



    } else {
      iziToast.show({
        title:'ERROR',
        titleColor:'#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe seleccionar una imagen'
      })
    }

  }

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

  borrarImagen( id: any, imagen: string){
    console.log(id);
    Swal.fire({
           title: 'Are you sure?',
           text: `Se va a eliminar la imagen`,
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes, delete it!'
         }).then((result) => {
            if (result.isConfirmed) {
              this._productoService.eliminar_img_galeria_admin( this.id, {_id:id, imagen:imagen} ).subscribe(
                     (resp: any) =>{
                       this.init_data()
                  }, (err: any)=>{

        })
            Swal.fire(
              'Deleted!',
              `La imagen ha sido eliminada`,
              'success'
        )
      }
    })

  }
}


