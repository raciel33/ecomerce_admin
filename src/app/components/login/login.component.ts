import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

declare  var jQuery: any;
declare var $ : any;
declare var iziToast: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  public loginForm = this.fb.group({
     email: [ localStorage.getItem('email') || '',[ Validators.required]],
     password: ['', Validators.required]

   })

    constructor( private _adminServices: AdminService,  private router: Router,private fb:FormBuilder){

    }

    login(){

       if(this.loginForm.valid ){

          this._adminServices.login_admin( this.loginForm.value ).subscribe(
            resp => {
              console.log(resp);
              this.router.navigateByUrl('inicio');

            },
            (err) =>{
              console.log(err);
              Swal.fire('Error',err.error.msg, 'error');    })

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
