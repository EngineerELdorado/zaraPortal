import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendComponent } from './send/send.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn:boolean;

  constructor(private router: Router, private modalService: NgbModal){
   
  }

 ngOnInit(){
  
  if(localStorage.getItem("authenticated")==="yes"){
    this.isLoggedIn=true
  }else{
    this.router.navigate(["/login"])
    
  }
 }

 openTransferWindow(){
  const modalRef = this.modalService.open(SendComponent);
  modalRef.componentInstance.name = 'Transfer';
 }
}


