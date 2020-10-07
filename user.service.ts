import { Injectable } from '@angular/core';
import {User} from './models/user';
import {environment} from '../environments/environment';
import{HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from  '@angular/common/http';
import { Observable, throwError, from, concat } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  createuser:User={
    _id:'',
    name:'',
    email:'',
    password:'',
    phone:''
  }

  constructor(private http: HttpClient,
    private route:Router) { }

    create(user:User) {
      return this.http.post( environment.apiBaseUrl+'/user', user)
    }


  // Update employee
  updateuser(id , data): Observable<any> {
   return this.http.put(environment.apiBaseUrl+`/users/${id}`, data)
  }

  // Delete employee
  deleteuser(id:string): Observable<any> {
    return this.http.delete(environment.apiBaseUrl+`/users/${id}`)
  }

    // Get employee
    getuser(id): Observable<any> {
      return this.http.get(environment.apiBaseUrl+`/get/${id}` )
    }
  


  }
