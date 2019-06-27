import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNullValue'
})
export class IsNullValuePipe implements PipeTransform {

  transform(value: any, args: string): any {
    if(value === null || value === undefined || value === ""){
      return args;
    } else {
      return value + " min";
    }
  }

}
