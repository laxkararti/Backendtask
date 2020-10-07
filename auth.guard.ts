import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import{AdminService} from './admin.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public userservice: AdminService,
    public route: Router
  ) { }



  canActivate()
     :boolean {
      if (!this.userservice.isLoggedIn == true) {
      //  window.alert("Access not allowed!");
        this.route.navigateByUrl('/users');
      }
    return true;
  }
  }
