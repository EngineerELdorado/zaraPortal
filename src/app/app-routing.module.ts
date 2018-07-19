import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { SendComponent } from './send/send.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },{
    path:'users',
    component:UserComponent
  },
  {
    path:'user/:id',
    component:UserDetailsComponent
  }
  ,{
    path:'transactions',
    component:TransactionComponent
  },
  {
    path:'roles',
    component:RoleComponent
  },{
    path:'login',
    component:LoginComponent
  },{
    path:'send',
    component:SendComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
