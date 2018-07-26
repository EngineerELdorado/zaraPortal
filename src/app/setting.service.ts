import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { HttpClient } from '@angular/common/http';
import { Setting } from './settings/Setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private constants: ConstantsService, private http: HttpClient) { }

  getAll(){

    return this.http.get<Setting[]>(this.constants.BACKEND_URL+"/settings/all", {observe:"response"})
  }

  getOne(id){
    
    return this.http.get<Setting>(this.constants.BACKEND_URL+"/settings/getOne/"+id, {observe:"response"})
  }

  toggle(id){
    
    return this.http.get<Setting>(this.constants.BACKEND_URL+"/settings/toggleSms/"+id, {observe:"response"})
  }
}
