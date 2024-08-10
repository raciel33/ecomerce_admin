import { IndexProductoComponent } from './productos/index-producto/index-producto.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { IndexClienteComponent } from './clientes/index-cliente/index-cliente.component';
import { RouterModule } from '@angular/router';
import { CreateClienteComponent } from './clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './productos/create-producto/create-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateProductoComponent } from './productos/update-producto/update-producto.component';




@NgModule({
  declarations: [
   InicioComponent,
   NoPagesFoundComponent,
   SidebarComponent,
   LoginComponent,
   IndexClienteComponent,
   CreateClienteComponent,
   EditClienteComponent,
   CreateProductoComponent,
   IndexProductoComponent,
   UpdateProductoComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,RouterModule,
    HttpClientModule

  ],
  exports:[
    InicioComponent,
    NoPagesFoundComponent,
    SidebarComponent,


  ]
})
export class ComponentsModule { }
