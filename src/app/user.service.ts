import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { User } from './user/User';
import { Role } from './role/Role';

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
  public addUser(user, role:string){
    let params = new HttpParams();
    params=  params.append("role", role);
    params=  params.append("generatePin","true")
    return this.http.post<User>(this.constants.BACKEND_URL+"/users/add",user, {observe:'response', params:params});
   }

   public updateUser(user, accNo:string){
    return this.http.post(this.constants.BACKEND_URL+"/users/update/"+accNo,user, {observe:'response'});
   }
   

   public blockUser(accountNumber, by){
    let params = new HttpParams();
    params=  params.append("accountNumber", accountNumber);
    params=  params.append("doneBy",by)
    return this.http.get(this.constants.BACKEND_URL+"/users/lockUnlock", {observe:'response', params:params});
   }
}
