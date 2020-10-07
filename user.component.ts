import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import{UserService} from '../user.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  registerForm: FormGroup;

  constructor( private user:UserService ,
    private formBuilder: FormBuilder,
        private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],      
      phone: [''],
      password: ['']
  });
  }


  register(){
    this.user.create(this.registerForm.value).subscribe((res) => {
      if (res) {
        this.router.navigate(['/users']);
      }
     
  });
}
}
