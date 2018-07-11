import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from './User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:User[]
  isLoggedIn;
  constructor(private userService: UserService) { }

  ngOnInit(){
    this.getUsers();
    this.isLoggedIn =sessionStorage.getItem("isLoggedIn")
    console.log(this.isLoggedIn)
  }

  public getUsers(){
    this.userService.getUsers().subscribe(res=>{
      this.users=res.body
    })
  }
}