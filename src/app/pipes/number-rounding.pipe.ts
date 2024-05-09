import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRounding'
})
export class NumberRoundingPipe implements PipeTransform {

  transform(value: number): unknown {
    let unit = ''

    if (value > 1000) {
      value /= 1000
      unit = ' K'
    } else {
      return value
    }

    if (value > 1000) {
      value /= 1000
      unit = ' M'
    }

    if (value > 1000) {
      value /= 1000
      unit = ' B'
    }

    return (value.toFixed(2)) + unit;
  }

}
