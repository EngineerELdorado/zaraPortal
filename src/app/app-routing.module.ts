import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { SendComponent } from './send/send.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'',
    canActivate:[AuthGuard],
    component:DashboardComponent
  },{
    path:'users',
    canActivate:[AuthGuard],
    component:UserComponent
  },
  {
    path:'user/:id',
    canActivate:[AuthGuard],
    component:UserDetailsComponent
  }
  ,{
    path:'transactions',
    canActivate:[AuthGuard],
    component:TransactionComponent
  },
  {
    path:'roles',
    canActivate:[AuthGuard],
    component:RoleComponent
  },{
    path:'login',
    component:LoginComponent
  },{
    path:'send',
    canActivate:[AuthGuard],
    component:SendComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
