import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../services/state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { randomString } from '../../libs/random-string';
import { AnalyticsService } from '../../services/analytics.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  firstName: string
  lastName: string
  phoneNumber: string
  isNew = false
  mapsSessionId = randomString(16)
  loading = false
  input = ''
  returnUrl: string
  place: any
  showExtraAddressInfo = false
  allowAdvertising
  addressSuggestions = []
  extraAddressInfo = ''
  saved = false

  constructor(
    private http: HttpClient,
    public state: StateService,
    private router: Router,
    private user: UserService,
    private route: ActivatedRoute,
    private analytics: AnalyticsService,
    private snackBar: MatSnackBar,
  ) {
    this.firstName = this.state.user.firstName
    this.lastName = this.state.user.lastName
    this.phoneNumber = this.state.user.phoneNumber
    this.extraAddressInfo = this.state.user.address.extraAddressInfo
    if (this.route.snapshot.queryParams.isNew) this.isNew = true
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || this.isNew ? 'dashboard' : 'settings'
    if (this.state.user.address.extraAddressInfo) this.showExtraAddressInfo = true
  }

  ngOnInit() {
    if (this.state.user.address.formatted) {
      this.input = this.state.user.address.formatted
      this.place = {}
    }
  }

  selectAddress(place) {
    this.place = place
    this.addressSuggestions = []
  }

  onAddressSuggestions(suggestions) {
    this.addressSuggestions = suggestions
  }

  getParams() {
    let params: any = {}
    if (this.allowAdvertising) params.allowAdvertising = this.allowAdvertising
    if (this.firstName) params.firstName = this.firstName
    if (this.lastName) params.lastName = this.lastName
    if (this.phoneNumber) params.phoneNumber = this.phoneNumber

    let place = this.place
    let newAddress = true
    if (!place || !place.formatted_address) {
      newAddress = false
      place = {
        lat: this.state.user.address.coordinates[0],
        lng: this.state.user.address.coordinates[1],
        formatted_address: this.state.user.address.formatted
      }
    }

    params.address = { coordinates: [] }
    if (place.lat) params.address.coordinates.push(place.lat)
    if (place.lng) params.address.coordinates.push(place.lng)
    if (place.formatted_address) params.address.formatted = place.formatted_address
    if (newAddress) params.noShopsInRange = false
    if (this.extraAddressInfo) params.address.extraAddressInfo = this.extraAddressInfo
    return params
  }

  async submitForm(form: NgForm) {
    if (!form.valid || this.loading) return
    if (!this.place) return this.snackBar.open('Please enter your address', 'close', { duration: 2000 })
    if (this.addressSuggestions.length) return this.snackBar.open('Please select an address', 'close', { duration: 2000 })
    let params = this.getParams()
    if (this.allowAdvertising) this.analytics.event('allow-advertising', 'personal-details')
    this.loading = true
    let resp = <any>await this.http.put(environment.apiEndpoint + '/user', params, { headers: { Authorization: this.state.token } }).toPromise()
    this.saved = true
    if (!resp.status) return alert(resp.error)
    if (!this.state.user.address.formatted) this.analytics.event('engagement', 'add-personal-details')
    else this.analytics.event('engagement', 'edit-personal-details')
    await this.user.getUser()
    this.router.navigate([this.returnUrl])
  }

  canDeactivate() {
    if (!this.state.user) return true
    if (this.saved) return true
    let params = this.getParams()
    let user = JSON.parse(JSON.stringify(this.state.user))
    Object.assign(user, params)
    let changed = JSON.stringify(user) !== JSON.stringify(this.state.user)
    if (changed) return confirm('Are you sure you want to leave without saving?')
    return true
  }

}
