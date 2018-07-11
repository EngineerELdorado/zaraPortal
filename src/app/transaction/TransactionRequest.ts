export interface TransactionRequest{
    sender:string;
    receiver:string;
    amount:string;
    description?:string;
    pin:string;
}