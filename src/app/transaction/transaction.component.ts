import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { Transaction } from './Transaction';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions:Transaction[];
  constructor(private transactionService:TransactionsService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(){
   this.spinner.show();
    this.transactionService.getAllTransactions().subscribe(res=>{
      this.transactions=res.body
    },err=>{
      this.spinner.hide();
    },()=>{
      this.spinner.hide();
    })
  }

}
