import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user/User';
import { Transaction } from '../transaction/Transaction';
import { TransactionsService } from '../transactions.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  
  userAccountNumber;
  myForm:FormGroup;
  isVerified:boolean;
  isLocked:boolean;
  needToChangePin:boolean;
  user:User;
  transactions:Transaction[];
  responseMsg:string;
  lockingMessage;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,private activatedRoute: ActivatedRoute,
     private transactionService:TransactionsService,
     private userService:UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.userAccountNumber = params['id'];
     
      this.myForm= new FormGroup({
        fullName:new FormControl('', Validators.required),
        phone:new FormControl({value: '', disabled: true}, Validators.required),
        
      });

      this.getUser();

      
    })
  }

  getUser(){
    this.userService.getUserByAccountNumber(this.userAccountNumber).subscribe(res=>{
      this.user=res.body;
      this.isVerified=this.user.verified;
      this.isLocked=this.user.isLocked;
      this.needToChangePin=this.user.needToChangePin;
      this.myForm.patchValue({
        fullName: this.user.fullName,
        phone:"+"+this.user.phone
      });
      this.transactionService.getMiniStatement(this.user.id).subscribe(res=>{
        this.transactions=res.body
      });
      
      
      
      console.log(this.user)
    })
  }
  openSm(content) {
    
    this.modalService.open(content, { size: 'sm' });
  }
  block()
{
   this.userService.blockUser(this.user.accountNumber, localStorage.getItem("phone")).subscribe(res=>{
    
    this.responseMsg= res.headers.get("response_message")
    this.showSuccess();
   },
  (err)=>{
    this.responseMsg=err.headers.get("response_message")
    this.showError();
  })
}



update(myform:FormGroup){
     this.userService.updateUser(myform.value, this.user.accountNumber).subscribe(res=>{

      this.responseMsg = res.headers.get("response_message");
      this.showSuccess();
     },err=>{
       this.responseMsg=err.headers.get("response_message")
       this.showError();
     })
}

showSuccess() {
  this.toastr.success(this.responseMsg, 'REUSSI');
  this.getUser();
}
showError() {
  this.toastr.error(this.responseMsg, 'ECHEC');
}

}
