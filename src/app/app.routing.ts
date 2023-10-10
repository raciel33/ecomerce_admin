import { AdminGuard } from './guards/admin.guard';

import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";


const appRoute : Routes = [
 { path: 'inicio', component: InicioComponent, canActivate: [ AdminGuard ]},
 { path: 'login', component: LoginComponent},
 { path:'', redirectTo:'/inicio' , pathMatch: 'full' },


];

export const appRoutingProvide: any [] = [];

export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
