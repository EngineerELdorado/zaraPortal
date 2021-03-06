import { Role } from "../role/Role";

export interface User{
    id:string,
    accountNumber:string,
    agentNumber:string,
    fullName:string,
    phone:string,
    balance:number,
    verified:boolean,
    verificationCode:string,
    roles:Role[];
    needToChangePin:boolean;
    tempPin:string;
    isLocked:boolean;
}
