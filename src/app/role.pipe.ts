import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==="ROLE_SUPERADMIN"){
      return "Super Admin";
    } else if(value==="ROLE_ADMIN"){
      return "Admin";
    }
    else if(value==="ROLE_STAFF"){
      return "Staff";
    }else if(value==="ROLE_AGENT"){
      return "Agent";
    }else if(value==="ROLE_USER"){
      return "User";
    }
    return value;
  }

}
