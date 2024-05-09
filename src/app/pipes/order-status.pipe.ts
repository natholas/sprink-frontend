import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let order = args[0]
    
    if (value === 'initial') return 'Initial'
    if (value === 'ready') return 'Scheduled pickup'
    if (value === 'pickedup') return 'Scheduled delivery'
    if (value === 'delivered') return 'Cleaned and delivered'
    if (value === 'atshop') return 'At shop'
    if (value === 'error') return 'Error'
    if (value === 'cancelled') {
      let by = order.statusHistory.find(s => s.status === 'cancelled').updatedBy
      return 'Cancelled by ' + by
    }
  }

}
