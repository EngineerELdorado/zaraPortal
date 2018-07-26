import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==="ROLE_SUPERADMIN"){
      return "Super Admin".toUpperCase();
    } else if(value==="ROLE_ADMIN"){
      return "Admin".toUpperCase();
    }
    else if(value==="ROLE_STAFF"){
      return "Staff".toUpperCase();
    }else if(value==="ROLE_AGENT"){
      return "Agent".toUpperCase();
    }else if(value==="ROLE_USER"){
      return "User".toUpperCase();
    }else if(value==="ROLE_MASS_PAYER"){
      return "Mass Payer".toUpperCase();
    }
    return value;
  }

}
