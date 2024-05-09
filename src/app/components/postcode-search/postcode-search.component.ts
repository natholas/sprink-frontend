import { Component } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { PostcodesService } from 'src/app/services/postcodes.service';
import { ShopsService } from 'src/app/services/shops.service';
import { StateService } from 'src/app/services/state.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-postcode-search',
  templateUrl: './postcode-search.component.html',
  styleUrls: ['./postcode-search.component.scss']
})
export class PostcodeSearchComponent {

  postCode: string
  coords = []
  loading = false

  constructor(
    private postcodeService: PostcodesService,
    private shops: ShopsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private storage: StorageService,
    private analytics: AnalyticsService
  ) { }

  async searchPostCode() {
    if (this.loading) return
    if (!this.postCode) {
      this.analytics.event('post-code-search-fail', 'none-entered')
      return this.snackBar.open('Please enter a postcode', 'close', { duration: 2500 })
    }
    if (this.postCode.length < 6) {
      this.analytics.event('post-code-search-fail', 'too-short', this.postCode)
      return this.snackBar.open('Please enter a valid UK postcode', 'close', { duration: 2500 })
    }
    this.loading = true
    let postCode = this.postcodeService.convertPostCode(this.postCode)
    let resp = <any>await this.postcodeService.geoCode(postCode)
    this.loading = false
    if (!resp || !resp.result || !resp.result.latitude) {
      this.analytics.postCodeSearch('postcode-not-found', postCode)
      return this.snackBar.open('Postcode not found', 'close', { duration: 2500 })
    }
    this.storage.setLocal('postCode', postCode)
    this.router.navigate(['selection'], { queryParams: { postCode: postCode.toLowerCase().split(' ').join('')}})
  }

}
