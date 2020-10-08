import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { from } from 'rxjs';
import {AdminService} from './admin.service'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
    constructor(private userService : AdminService,
      private router : Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.userService.getToken();
        req = req.clone({
          headers: req.headers.set('token', '' + token)
      });
     // req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
     // req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
  
        return next.handle(req);
      }
      
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
