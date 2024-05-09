import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-super-admin-orders',
  templateUrl: './super-admin-orders.component.html',
  styleUrls: ['./super-admin-orders.component.scss']
})
export class SuperAdminOrdersComponent implements OnInit {

  orders: any[] = []
  displayedColumns: string[] = ['createDate', 'status', 'totalAmount', 'userId', 'star'];
  loading = true
  dataSource: any
  totals: any = []
  statuses = { 'initial': false, 'ready': true, 'pickedup': true, 'delivered': true, 'atshop': true, 'cancelled': false, 'error': false}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.init()
  }

  async init() {
    this.orders = this.route.snapshot.data.orders
    this.orders.forEach(o => o.createDate = o.statusHistory[0].time)
    this.orders = this.orders.filter(o => this.statuses[o.status])
    
    this.totals = []
    this.orders.forEach(o => {
      let total = this.totals.find(t => t.currency === o.currency)
      if (!total) {
        total = { currency: o.currency, total: 0 }
        this.totals.push(total)
      }
      total.total += o.totalAmount
    })
    
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
