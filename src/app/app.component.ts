import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendComponent } from './send/send.component';
import { AddUserComponent } from './add-user/add-user.component';
import * as jwt_decode from "jwt-decode";
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { UserService } from './user.service';
import { FormGroup } from '@angular/forms';
import { ConstantsService } from './constants.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn:boolean;
  decoded_token:string;
  isVerified:boolean;
  myForm:FormGroup;
  constructor(private router: Router,
    private constants:ConstantsService,
     private userService:UserService,
     private modalService: NgbModal){
   
  }

 ngOnInit(){
  if(localStorage.getItem("zara_token")!==null){
    this.decoded_token=jwt_decode(localStorage.getItem("zara_token").substring(6))
    console.log(this.decoded_token)
  this.userService.checkVerify(this.decoded_token.sub).subscribe(res=>{
    console.log(res)
    if(res.headers.get("response_message")==="no"){
      this.openVerificationCodeModal();
    }
    
  })
  if(localStorage.getItem("authenticated")==="yes"){
    this.isLoggedIn=true;
    console.log("authenticated")
  }else{
    console.log("non authenticated")
    localStorage.clear();
    window.location.href = this.constants.FRONTEND_URL+"/login";
    
  }
  }
  else{
    console.log("non authenticated")
    localStorage.clear();
    window.location.href = this.constants.FRONTEND_URL+"/login";
    
  }
  
  
 }

 openTransferWindow(){
  const modalRef = this.modalService.open(SendComponent);
  modalRef.componentInstance.name = 'Transfer';
 }

 openAddUserModal(){
  const modalRef = this.modalService.open(AddUserComponent);
  modalRef.componentInstance.name = 'AddUser';
 }

 openVerificationCodeModal(){
  const modalRef = this.modalService.open(VerifyCodeComponent);
  modalRef.componentInstance.name = 'VerificationCode';
 }
}


