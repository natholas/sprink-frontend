import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sprink-credit-settings',
  templateUrl: './sprink-credit-settings.component.html',
  styleUrls: ['./sprink-credit-settings.component.scss']
})
export class SprinkCreditSettingsComponent {

  constructor(public state: StateService, public location: Location) { }

}
