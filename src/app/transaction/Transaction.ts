import { User } from "../user/User";

export interface Transaction{
    id:number;
    transactionNumber:string;
    description;
    createdOn;
    createdBy:User;
    transactionType;
    receiver:User;
    amount;
}