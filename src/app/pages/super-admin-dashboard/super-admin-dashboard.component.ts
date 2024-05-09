import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent {

  isProduction = false
  constructor(private http: HttpClient, private state: StateService) {
    this.isProduction = environment.production
  }

  // async importExport() {
  //   if (!confirm('Are you sure? This will slow down production for a few seconds')) return
  //   await this.http.post(environment.apiEndpoint + '/export', {}, { headers: { Authorization: this.state.token } }).toPromise()
  //   await this.http.post(environment.apiEndpoint.split('sprinkclean').join('test.sprinkclean') + '/import', {}, { headers: { Authorization: this.state.token } }).toPromise()
  // }

}
