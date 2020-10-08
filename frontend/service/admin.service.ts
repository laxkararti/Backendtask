import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Register} from './models/register';
import{HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from  '@angular/common/http';
import { Observable, throwError, from, concat } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
    private route:Router) {
      
     }

     registeruser:Register={
      name:'',
      email:'',
      password:'',
      phone:''
    }

    register(user:Register) {
      return this.http.post( environment.apiBaseUrl+'/register', user)
    }


    noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

    // Sign-in
    signIn(user:Register):Observable<any> {
      return this.http.post<any>(environment.apiBaseUrl + '/authenticate', user, this.noAuthHeader)
      }
  
    getToken() {
      return localStorage.getItem('token');
    }
  
   
    doLogout() {
       localStorage.removeItem('token');
        this.route.navigate(['/authenticate']);
      }
    
  settoken(token:string){
    return localStorage.setItem('token',token);
  }
  
  
    get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
       return (authToken !== null) ? true : false
    }
   
  dashboard(){
    var tokenheader = new HttpHeaders({'token': localStorage.getItem('token')})
    return this.http.get(environment.apiBaseUrl+'/users',{ headers: tokenheader})
  }
  

}
