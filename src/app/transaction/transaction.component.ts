import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { Transaction } from './Transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions:Transaction[];
  constructor(private transactionService:TransactionsService) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(){
   
    this.transactionService.getAllTransactions().subscribe(res=>{
      this.transactions=res.body
    })
  }

}
