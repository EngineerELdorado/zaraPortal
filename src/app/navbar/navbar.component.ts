import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
fullName:string
authenticated:string

  constructor(private router:Router, private constants:ConstantsService) { }
  
  ngOnInit() {
    
    this.authenticated = localStorage.getItem("authenticated");
    this.fullName=localStorage.getItem("fullName")
    console.log("Full Name "+this.fullName+" "+this.authenticated)
    
  }

  logout(){
    localStorage.clear();
    window.location.href = this.constants.FRONTEND_URL+"/login";
    }
}
