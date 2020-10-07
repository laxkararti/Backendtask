import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import{AdminService} from '../admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  registerForm: FormGroup;


  constructor(public admin:AdminService,
    private formBuilder: FormBuilder,
        private router: Router) {

         }
    
         ngOnInit(): void {
          this.registerForm = this.formBuilder.group({
            name: ['', Validators.required, Validators.minLength(3), Validators.maxLength(20)],
            email: ['', Validators.required,   	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],      
            phone: ['',[ Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
        });
        }
        
  get f() { return this.registerForm.controls; }

  register(){
    this.admin.register(this.registerForm.value).subscribe((res) => {
      if (res) {
        this.router.navigate(['/authenticate']);
      }
     
  });
}

}
