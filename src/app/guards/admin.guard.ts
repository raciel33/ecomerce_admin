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
    if ( !this._adminService.validarToken([])) {
      this._router.navigate(['/login'])
      return false;
    }

    return true
  }

}
