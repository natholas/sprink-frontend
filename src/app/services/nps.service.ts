import { Injectable } from '@angular/core';
import { loadScript } from '../libs/load-script';

declare let thermostatio

@Injectable({
  providedIn: 'root'
})
export class NpsService {

  constructor() { }

  async showNps() {
    await loadScript('https://thermostat.io/s/88472a8b/survey.js')
    thermostatio.start({ email: false, name: false })
  }
}
