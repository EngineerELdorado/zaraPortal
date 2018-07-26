import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAgent'
})
export class IsAgentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if ( value === '' || value == null || value === undefined) {
      return 'Non';
    }
    return value;
  }

}
