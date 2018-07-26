import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';
import { Setting } from './Setting';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings:Setting[];
  setting:Setting;
  responseMsg:string;
  constructor(private settingsService: SettingService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.getData();
    
  }

  getData(){
    this.settingsService.getAll().subscribe(res=>{
      this.settings=res.body
    },(err:HttpErrorResponse)=>{
      console.log(err)
    })
  }

  open(content, set:Setting){

    this.setting=set;
    this.modalService.open(content);
  }

  toggleSms(id, content){
    this.spinner.show();
    this.settingsService.toggle(id).subscribe(res=>{
      //this.setting=res.body;
      this.responseMsg=res.headers.get("response_message");
      this.showSuccess();
      

    },(err:HttpErrorResponse)=>{
      console.log(err)
      this.responseMsg="L'operation a echouE";
      this.showError();
    })
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
