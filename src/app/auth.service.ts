import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private constants:ConstantsService) { }

  public login(user){
    return this.http.post(this.constants.BACKEND_URL+"/login",JSON.stringify(user),{observe:"response"})
  }

}
