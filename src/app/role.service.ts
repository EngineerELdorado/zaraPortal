import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { HttpClient } from '@angular/common/http';
import { Role } from './role/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private constants:ConstantsService) { }

  public getAll(){
   return this.http.get<Role[]>(this.constants.BACKEND_URL+"/roles/getAll", {observe:'response'});
  }
}
