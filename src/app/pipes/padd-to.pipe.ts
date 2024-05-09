import { Pipe, PipeTransform } from '@angular/core';
import { paddTo } from '../libs/padd-to';

@Pipe({
  name: 'paddTo'
})
export class PaddToPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return paddTo(value.toString(), args[0])
  }

}
