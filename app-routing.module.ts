import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path:'register', component:AdminsComponent},
  {path:'authenticate', component:LoginComponent},
  {path:'users', component:DashboardComponent},
  {path:'user', component:UserComponent},
  {path:'users/:id', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
