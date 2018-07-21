import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.css']
})
export class ChangePinComponent implements OnInit {
  myForm:FormGroup;
  responseMsg;
  constructor(private userService:UserService,private toastr: ToastrService, 
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.myForm=new FormGroup({
      oldPin: new FormControl('', Validators.required),
      newPin: new FormControl('', Validators.required),
      confirmNewPin: new FormControl('', Validators.required),
    })
  }

  post(form:FormGroup){
     if(form.value.newPin===form.value.confirmNewPin){
       this.userService.changePin(form.value, localStorage.getItem("phone")).subscribe(res=>{
         this.responseMsg=res.headers.get("response_message")
         this.showSuccess();
       },(err:HttpErrorResponse)=>{
        this.responseMsg=err.headers.get("response_message")
        this.showError();
       })
     }
     else{
       this.responseMsg="le noveau pin et la confirmation du nouveau pin ne sont pas identiques"
       this.showError();
     }
  }

  showSuccess() {
    this.spinner.hide();
   this.toastr.success(this.responseMsg, 'REUSSI');
 }
 showError() {
   this.spinner.hide();
   this.toastr.error(this.responseMsg, 'ECHEC');
 }

}
