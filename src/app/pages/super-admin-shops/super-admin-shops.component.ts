import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PostcodesService } from 'src/app/services/postcodes.service';
import { distance } from 'src/app/libs/distance';

@Component({
  selector: 'app-super-admin-shops',
  templateUrl: './super-admin-shops.component.html',
  styleUrls: ['./super-admin-shops.component.scss']
})
export class SuperAdminShopsComponent implements OnInit {

  shops: any[] = []
  displayedColumns: string[] = ['name', 'created_at', 'isVerified', 'isOpen', 'productCount', 'star'];
  loading = true
  numOfShopsWaitingForReview = 0
  viewShopsForReview = false
  viewOpenShopsOnly = false
  namedShopsOnly = false
  dataSource: any
  coveragePercentage

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private route: ActivatedRoute, private postCodesService: PostcodesService) { }

  ngOnInit() {
    this.init()
  }

  async init() {
    this.shops = this.route.snapshot.data.shops
    if (this.viewShopsForReview) this.shops = this.route.snapshot.data.shops.filter(s => !s.isVerified && s.submittedDocuments)
    if (this.viewOpenShopsOnly) this.shops = this.route.snapshot.data.shops.filter(s => s.isOpen)
    if (this.namedShopsOnly) this.shops = this.route.snapshot.data.shops.filter(s => s.name)
    this.shops.forEach(shop => shop.productCount = shop.products.length)
    this.dataSource = new MatTableDataSource(this.shops);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.numOfShopsWaitingForReview = this.shops.filter(s => !s.isVerified && s.submittedDocuments).length
    await this.postCodesService.getPostCodeData()
    this.coveragePercentage = undefined
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.coveragePercentage = undefined
  }

  calcCoverage() {
    let totalCoverage = this.evaluateCoverage()
    this.coveragePercentage = 100 / this.postCodesService.totalPop * totalCoverage
  }

  evaluateCoverage() {
    if (!this.postCodesService.postCodeData) return
    let postCodeData = JSON.parse(JSON.stringify(this.postCodesService.postCodeData))
    let postCodes = []
    let pop = 0
    this.shops.forEach(shop => {
      postCodeData.forEach(d => {
        if (d.done) return
        let dist = distance(shop.location.coordinates[1], shop.location.coordinates[0], d[0], d[1])
        if (dist < shop.maxDistanceFromShop) {
          postCodes.push(d[3])
          pop += d[2]
          d.done = true
        }
      })
    })
    return pop
  }

}
