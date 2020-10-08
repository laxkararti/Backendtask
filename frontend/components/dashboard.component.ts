import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AdminService} from '../admin.service';
import { User } from '../models/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
output:any
  users=[];
  currentuser:User;
  constructor(private admin:AdminService,
    private router:Router,
    private user: UserService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.admin.dashboard().subscribe(res=>{
      this.output = res
    })

    }
 

createfun(){
  this.router.navigate(['/user']);
}
 i:any;
removeuser() {
  if(window.confirm('Are you sure?')) {
      this.user.deleteuser(this.currentuser._id ).subscribe((doc) => {

        this.router.navigate(['/users'])      }
    )    
  }
}



}
