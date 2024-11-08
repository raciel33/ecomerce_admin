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
import { IventarioProductoComponent } from './productos/iventario-producto/iventario-producto.component';
import { CreateCuponComponent } from './cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './cupones/index-cupon/index-cupon.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { UpdateCuponComponent } from './cupones/update-cupon/update-cupon.component';
import { ConfigComponent } from './config/config.component';
import { VariedadProductoComponent } from './productos/variedad-producto/variedad-producto.component';
import { GaleriaProductoComponent } from './productos/galeria-producto/galeria-producto.component';
import { EditDescuentoComponent } from './descuento/edit-descuento/edit-descuento.component';
import { IndexDescuentoComponent } from './descuento/index-descuento/index-descuento.component';
import { CreateDescuentoComponent } from './descuento/create-descuento/create-descuento.component'; // <-- import the module




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
   UpdateProductoComponent,
   IventarioProductoComponent,
   CreateCuponComponent,
   IndexCuponComponent,
   UpdateCuponComponent,
   ConfigComponent,
   VariedadProductoComponent,
   GaleriaProductoComponent,
   EditDescuentoComponent,
   IndexDescuentoComponent,
   CreateDescuentoComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,RouterModule,
    HttpClientModule,
    NgxPaginationModule,


  ],
  exports:[
    InicioComponent,
    NoPagesFoundComponent,
    SidebarComponent,


  ]
})
export class ComponentsModule { }
