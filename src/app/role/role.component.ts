import { Component, OnInit } from '@angular/core';
import { Role } from './Role';
import { RoleService } from '../role.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
   
  roles:Role[]
  constructor(private roleService:RoleService,
    
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.roleService.getAll().subscribe(res=>{
      this.roles=res.body
    },(err)=>{
      this.spinner.hide();
    },()=>{
      this.spinner.hide();
    })
  }

}
