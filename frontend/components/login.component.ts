import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AdminService} from '../admin.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: any={};

  constructor(private admin:AdminService,
    private route:Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  loginUser () {
    this.admin.signIn(this.loginUserData)
    .subscribe(
     (res:any)  => {
      localStorage.setItem('token', res.token)
      return this.route.navigate(['/users'])
      },
      err => console.log(err)
    ) 
  }

}
