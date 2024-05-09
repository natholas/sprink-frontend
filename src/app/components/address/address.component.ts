import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, NgZone, Output, EventEmitter, Input } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  predictions: any[] = []
  place: any
  editMode = true
  sessionToken: string
  placesService
  autocompleteService: any
  geolocation: any
  loading = false
  postcode = ''
  postcodeAutofill = 'postcode'
  autofillPostCode = true
  foundPostCode = false

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onSuggestions: EventEmitter<any> = new EventEmitter();
  @Input('input') input

  constructor(
    private userService: UserService,
    private storage: StorageService,
    private snackbar: MatSnackBar
  ) {
    this.postcode = this.storage.getLocal('postCode') || ''
    if (this.postcode) {
      this.postcodeAutofill = 'gjahdkjwhadkjawhdkajhdajkdhajdhw'
      this.autofillPostCode = false
    }
    this.storage.remove('postCode')
  }

  async ngOnInit() {
    if (this.input) {
      this.editMode = false
      this.place = { formatted_address: this.input }
    } else if (this.postcode) {
      this.findAddresses()
    }
  }

  editPostCode() {
    this.foundPostCode = false
    this.predictions = []
  }

  async findAddresses() {
    if (this.loading) return
    if (this.postcode.length < 6) return this.snackbar.open('Postcode is not valid', 'close', { duration: 2000 })
    if (this.postcode.length > 10) return this.snackbar.open('Postcode is not valid', 'close', { duration: 2000 })
    this.loading = true
    let resp = await this.userService.findAddress(this.postcode)
    this.loading = false
    this.place = undefined
    this.predictions = (resp.data && resp.data.result) ? resp.data.result : []
    if (this.predictions.length) this.foundPostCode = true
    this.onSuggestions.emit(this.predictions)
  }

  async selectAddress(place) {
    let formatted_address = `${place.line_1} ${place.line_2} ${place.line_3}, ${place.post_town}, ${place.postcode}`
    this.onSelect.emit({ formatted_address, lat: place.latitude, lng: place.longitude })
  }

}
