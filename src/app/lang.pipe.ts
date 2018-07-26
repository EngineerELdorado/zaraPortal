import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lang'
})
export class LangPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(value==="fr"){
      return "Francais";
    }
    else if (value==="en"){
      return "English"
    }
    
    return value;
  }

}
