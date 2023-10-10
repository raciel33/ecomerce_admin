import { AdminService } from 'src/app/services/admin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

declare var iziToast: any;


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private _adminService: AdminService , private _router: Router){

  }
  canActivate(): any{
    if ( !this._adminService.isAuthenticated([])) {
      this._router.navigate(['/login'])
      return false;
    }
    if (this._adminService.user.rol != 'admin') {
      this._router.navigate(['/login'])
      iziToast.show({
        title:'ERROR',
        titleColor:'#ff0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No tienes permisos de administrador'
      })
      return false;

    }
    return true
  }

}
