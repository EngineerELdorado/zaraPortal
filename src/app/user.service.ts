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

   public checkVerify(accountNumber){
    return this.http.get(this.constants.BACKEND_URL+"/users/checkVerified/"+accountNumber, {observe:'response'});
   }

   public verifyAccount(accountNumber, code){
    let params = new HttpParams();
    params=  params.append("accountNumber", accountNumber);
    params=  params.append("verificationCode",code)
    return this.http.get(this.constants.BACKEND_URL+"/users/verifyAccount", {observe:'response', params:params});
   }

   public resendCode(accountNumber){
    return this.http.get(this.constants.BACKEND_URL+"/users/resendVerificationCode/"+accountNumber, {observe:'response'});
   }
   
   public changePin(changePinRequest,accountNumber){
    return this.http.post(this.constants.BACKEND_URL+"/users/changePin/"+accountNumber, changePinRequest,{observe:'response'})
   }

   public resetPin(accountNumber){
    return this.http.get(this.constants.BACKEND_URL+"/users/resetPin/"+accountNumber,{observe:'response'})
   }

   public toggleRoles(accountNumber, role){
    let params = new HttpParams();
    params=  params.append("accountNumber", accountNumber);
    params=  params.append("roleName",role)
    return this.http.get(this.constants.BACKEND_URL+"/users/addRemoveRoles", {observe:'response', params:params});
   }
   
}
