import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-super-admin-users',
  templateUrl: './super-admin-users.component.html',
  styleUrls: ['./super-admin-users.component.scss']
})
export class SuperAdminUsersComponent implements OnInit {

  users: any[] = []
  displayedColumns: string[] = ['email', 'userType', 'createDate', 'star'];
  customerType
  loading = true
  dataSource: any

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.init()
  }

  async init() {
    this.users = this.route.snapshot.data.users
    if (this.customerType) this.users = this.users.filter(u => u.userType === this.customerType)
    this.dataSource = new MatTableDataSource(this.users);
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
