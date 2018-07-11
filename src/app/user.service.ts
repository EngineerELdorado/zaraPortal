import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { User } from './user/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //users: User[]

  constructor(private http: HttpClient, private constants: ConstantsService) { }

  public getUsers(){
    return this.http.get<User[]>(this.constants.BACKEND_URL+"/users/getAll", {observe: 'response'});
  }

  public getUserByAccountNumber(userId){
    return this.http.get<User>(this.constants.BACKEND_URL+"/users/getByAccountNumber/"+userId, {observe: 'response'});
  }
}
