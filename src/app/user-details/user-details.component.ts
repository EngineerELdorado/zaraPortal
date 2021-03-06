import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user/User';
import { Transaction } from '../transaction/Transaction';
import { TransactionsService } from '../transactions.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import {RoleService} from '../role.service';
import {Role} from '../role/Role';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userAccountNumber;
  myForm: FormGroup;
  isVerified: boolean;
  isLocked: boolean;
  needToChangePin:boolean;
  user: User;
  transactions: Transaction[];
  responseMsg:string;
  lockingMessage;
  roles: Role[];
  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute,
     private transactionService:TransactionsService,
     private rolesService: RoleService,
     private userService:UserService) { }

  ngOnInit() {


    this.activatedRoute.params.subscribe(params=>{
      this.userAccountNumber = params['id'];

      this.myForm= new FormGroup({
        fullName:new FormControl('', Validators.required),
        phone:new FormControl({value: '', disabled: true}, Validators.required),

      });

      this.getUser();
      this.getRoles();


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
  });


}

getRoles(){
    this.rolesService.getAll().subscribe(res=>{
      this.roles=res.body;
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

resetPin(){
  this.userService.resetPin(this.user.accountNumber).subscribe(res=>{
    this.responseMsg=res.headers.get("response_message")
    this.showSuccess();
  },(err:HttpErrorResponse)=>{
    this.responseMsg=err.error;
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

onChange(){

}

onRoleChange(event, role){
  this.spinner.show();
 this.userService.toggleRoles(this.user.accountNumber, role).subscribe(res=>{
   this.responseMsg=res.headers.get("response_message");
   this.spinner.hide();
   this.showSuccess();
 }, (err:HttpErrorResponse)=>{
  this.responseMsg="ECHEC";
  this.spinner.hide();
  this.showSuccess();
  console.log(err)
 })
}

openRoleModal(content){
this.modalService.open(content);
}

}
