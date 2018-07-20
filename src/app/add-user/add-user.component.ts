import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { Role } from '../role/Role';
import { UserService } from '../user.service';
import { User } from '../user/User';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  myForm:FormGroup;
  roles:Role[]
  errorResponse:boolean;
  successResponse:boolean;
  user:User;
  responseMsg:string;
  constructor(
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private userService:UserService,
     private roleService: RoleService) { }

  ngOnInit() {
    this.myForm=new FormGroup({
      fullName:new FormControl('', Validators.required),
      phone:new FormControl('', Validators.required),
      role:new FormControl('', Validators.required)
    })

    this.roleService.getAll().subscribe(res=>{
      this.roles=res.body;

    })
  }
  onChange(){

  }
  post(myForm:FormGroup){
    console.log(myForm.value)
    this.spinner.show();
    this.userService.addUser(myForm.value, myForm.value.role).subscribe(res=>{

      this.responseMsg=res.headers.get("response_message")
      myForm.reset();
      this.user=res.body;
      this.showSuccess();
    },(err=>{
      this.responseMsg=err.headers.get("response_message")
      console.log(err)
      this.showError();
    }))
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
