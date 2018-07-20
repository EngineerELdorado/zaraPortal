import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../constants.service';
import { AuthService } from '../auth.service';
import * as jwt_decode from "jwt-decode";
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
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
  wrong:boolean=false;
  emailSent=false;
  isLoading:boolean=false;
  roles:any;
  emailWrong:boolean=false;
  responseMsg;
  constructor(private authService: AuthService,
    private toastr: ToastrService, 
    private constants: ConstantsService,
    private router:Router,
    private userService:UserService,
    private http:HttpClient) { }

  @ViewChild("resetPasswordModal")resetPwModal;
  ngOnInit() {
    console.log(this.wrong)
    
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

   

  

   onChange()
   {
     this.wrong=false;
     
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
     
    let user={
        accountNumber: form.value.accountNumber.substring(1),
        pin:form.value.pin
     }
    
     this.authService.login(user).subscribe(res=>{
      console.log(res.status)
       
         localStorage.setItem("authenticated", "yes");
         localStorage.setItem("zara_token", res.headers.get("Authorization"));
         this.decoded_token=jwt_decode(res.headers.get("Authorization").substring(6))
          this.user_id = this.decoded_token.sub
         
          this.userService.getUserByAccountNumber(this.user_id).subscribe((res)=>{
            console.log(res.body)
            localStorage.setItem("fullName", res.body.fullName)
            localStorage.setItem("phone", res.body.phone)
            localStorage.setItem("id", res.body.id)
            this.wrong=false;
            this.responseMsg="Bienvenu "+localStorage.getItem("fullName");
            this.showSuccess();
            window.location.href = this.constants.FRONTEND_URL;
            
          },(err:HttpErrorResponse)=>{
         
            
               
          },()=>{
            //alert();
          })
          
        
     },(err:HttpErrorResponse)=>{
      if(err.error.status===401){
        this.responseMsg="Echec \n Numero ou pin Incorrect";
        this.showError();
        
      }
      else{
        this.responseMsg="Echec \n"+err.message
        this.showError();
      }
      
     });
     
   }

   showSuccess() {
    this.toastr.success(this.responseMsg, 'REUSSI');
  }
  showError() {
    this.toastr.error(this.responseMsg, 'ECHEC');
  }
}
