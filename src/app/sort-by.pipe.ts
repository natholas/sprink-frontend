import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(array: any[], key: string) {
    let out = array.slice()
    out.sort((a, b) => a[key] > b[key] ? 1 : -1)
    return out
  }

}
