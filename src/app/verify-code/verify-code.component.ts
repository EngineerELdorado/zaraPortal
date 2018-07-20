import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {

  myForm:FormGroup
  responseMsg;
  constructor(
    private toastr: ToastrService,
    private userService:UserService) { }

  ngOnInit() {
    this.myForm=new FormGroup({
      code: new FormControl('', Validators.required)
    });
    
  }

  verifyCode(form:FormGroup){
    this.userService.verifyAccount(localStorage.getItem("phone"), form.value.code).subscribe(res=>{
      this.responseMsg=res.headers.get("response_message")
      this.showSuccess()
    },err=>{
      this.responseMsg=err.headers.get("response_message")
      this.showError()
    })
  }

  resendCode(form:FormGroup){
    this.userService.resendCode(localStorage.getItem("phone")).subscribe(res=>{
      this.responseMsg=res.headers.get("response_message")
      this.showSuccess()
    },err=>{
      this.responseMsg=err.headers.get("response_message")
      this.showError()
    })
  }

  showSuccess() {
    this.toastr.success(this.responseMsg, 'REUSSI');
  }
  showError() {
    this.toastr.error(this.responseMsg, 'ECHEC');
  }

}
