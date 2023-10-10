import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { InicioComponent } from './components/inicio/inicio.component';
//import { AuthGuard } from './guards/auth.guard';
import { NoPagesFoundComponent } from './components/no-pages-found/no-pages-found.component';
//import { AuthGuard } from './guards/auth.guard';
//import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
