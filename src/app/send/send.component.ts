import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../transaction/Transaction';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  myForm: FormGroup;
  errorResponse:boolean;
  successResponse:boolean;
  transaction:Transaction;
  responseMsg:string;
  constructor(
    private toastr: ToastrService,
    private transactionService:TransactionsService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.myForm= new FormGroup({
      sender: new FormControl('', Validators.required),
      receiver: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required)
    });
    this.myForm.patchValue({
      sender:"+"+localStorage.getItem("phone")
    })
  }

  onChange(){
    this.errorResponse=false;
    this.successResponse=false;
  }

  post(myForm:FormGroup){
    this.transactionService.adminTransfer(myForm.value).subscribe(res=>{
  
  
    this.responseMsg=res.headers.get("response_message")
    this.showSuccess();
    this.resetForm();
  
}, (err:any)=>{
  console.log(err)
  this.responseMsg=err.headers.get("response_message")
  this.showError();

})
  }

  resetForm(){
    this.myForm.patchValue({
      receiver:'',
      pin:'',
      amount:''
    })
  }
  
  showSuccess() {
    this.toastr.success(this.responseMsg, 'REUSSI');
  }
  showError() {
    this.toastr.error(this.responseMsg, 'ECHEC');
  }
}
