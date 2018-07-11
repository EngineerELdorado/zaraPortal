import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verified'
})
export class VerifiedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value===true){
      return "OUI";
    }else{
      return "NON"
    }

    
  }

}
