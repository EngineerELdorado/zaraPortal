import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bool'
})
export class BoolPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value===true){
      return"OUI";
    }
    else if(value===false){
      return "NON";
    }
    return value;
  }

}
