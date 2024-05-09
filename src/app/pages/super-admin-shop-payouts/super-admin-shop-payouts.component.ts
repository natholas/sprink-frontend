import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-super-admin-shop-payouts',
  templateUrl: './super-admin-shop-payouts.component.html',
  styleUrls: ['./super-admin-shop-payouts.component.scss']
})
export class SuperAdminShopPayoutsComponent implements OnInit {

  shops: any[]
  payouts: any[]
  displayedColumns: string[] = ['shopId', 'paidDate', 'amount', 'star'];
  dataSource: any
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(private route: ActivatedRoute) {
    this.shops = this.route.snapshot.data.data.shops
    this.payouts = this.route.snapshot.data.data.payouts
  }

  ngOnInit() {
    this.init()
  }

  async init() {
    this.payouts = this.route.snapshot.data.data.payouts
    this.dataSource = new MatTableDataSource(this.payouts);
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
