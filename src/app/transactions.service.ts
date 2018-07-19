import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { Transaction } from './transaction/Transaction';
import { TransactionRequest } from './transaction/TransactionRequest';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient, private constants:ConstantsService) { }

  public getAllTransactions(){
    return this.http.get<Transaction[]>(this.constants.BACKEND_URL+"/transactions/getAll", {observe: 'response'});
  }

  public getMiniStatement(id){
    return this.http.get<Transaction[]>(this.constants.BACKEND_URL+"/transactions/ministatement/"+id, {observe: 'response'});
  }

  public adminTransfer(request:TransactionRequest){
  
                return this.http.post(this.constants.BACKEND_URL+"/transactions/adminTransfer",request,{observe:'response'})
  }

  public send(senderAccountNumber, receiverAccountNumber, amount, senderPin){
    let params= new HttpParams();
    params= params.append("sender",senderAccountNumber)
    params= params.append("receiver",encodeURI(receiverAccountNumber))
    params= params.append("pin",senderPin)
    params= params.append("amount",amount)
                return this.http.get(this.constants.BACKEND_URL+"/transactions/sending",{params:params, observe:'response'})
  }
}
