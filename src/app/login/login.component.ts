import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../constants.service';
import { AuthService } from '../auth.service';
import * as jwt_decode from "jwt-decode";
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  resetForm:FormGroup;
  encoded_token:string;
  decoded_token:any;
  user_id:any;
  token_expiration: any;
  wrong:boolean;
  emailSent=false;
  isLoading:boolean=false;
  roles:any;
  emailWrong:boolean=false;
  constructor(private authService: AuthService, 
    private constants: ConstantsService,
    private router:Router,
    private userService:UserService,
    private http:HttpClient) { }

  @ViewChild("resetPasswordModal")resetPwModal;
  ngOnInit() {

    this.myForm= new FormGroup({
      accountNumber: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required)
    });

    this.myForm.reset()

    this.resetForm= new FormGroup({
      email:new FormControl('', Validators.required)
    })

    if(localStorage.getItem("authenticated")==="yes"){
      this.router.navigate(["/"])
    }else{
      
      
    }
   }

   

  

   onChange(event)
   {
     this.wrong=null;
     
   }

   ngOnDestroy()
   {
   // this.loginSubscription.unsubscribe;
   }


   showResetPassword()
   {
      this.resetPwModal.show();
   }

   resetPassword(form:FormGroup)
   {
  
   }

   hide()
   {
     this.resetForm.reset();
     this.resetPwModal.hide();
     this.emailSent=false;
     this.emailWrong=false;
     this.isLoading=false;
   }
   retry()
   {
    this.emailSent=false;
    this.emailWrong=false;
    //this.isLoading=false;
   }

   login(form:FormGroup){
     //console.log(form.value)
     this.authService.login(form.value).subscribe(res=>{
       console.log(res.headers)
       
         localStorage.setItem("authenticated", "yes");
         localStorage.setItem("zara_token", res.headers.get("Authorization"));
         this.decoded_token=jwt_decode(res.headers.get("Authorization").substring(6))
          this.user_id = this.decoded_token.sub
          console.log(this.user_id)
          this.userService.getUserByAccountNumber(this.user_id).subscribe(res=>{
            console.log(res.body)
            localStorage.setItem("fullName", res.body.fullName)
            localStorage.setItem("phone", res.body.phone)
            localStorage.setItem("id", res.body.id)
          },err=>{

          },()=>{
            window.location.href = this.constants.FRONTEND_URL;
          })
          
        
     },err=>{
        console.log(err)
     });
   }
}
