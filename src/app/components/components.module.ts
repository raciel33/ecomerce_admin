import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
   InicioComponent,
   NoPagesFoundComponent,
   SidebarComponent,
   LoginComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports:[
    InicioComponent,
    NoPagesFoundComponent,
    SidebarComponent,


  ]
})
export class ComponentsModule { }
