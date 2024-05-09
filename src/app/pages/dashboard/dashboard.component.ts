import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';
import { OrdersService } from '../../services/orders.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NpsService } from '../../services/nps.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders = []
  apiEndpoint: string
  constructor(public state: StateService,
    private route: ActivatedRoute,
    private user: UserService,
    private orderService: OrdersService,
    private router: Router,
    private nps: NpsService
  ) {
    this.apiEndpoint = environment.apiEndpoint
    this.user.requestNotificationsPermissions()
    this.nps.showNps()
  }

  async ngOnInit() {
    this.orders = this.route.snapshot.data.orders
  }

  logout() {
    this.user.logout()
    location.href = location.origin
  }

  async onUpdate() {
    this.orders = await this.orderService.getOrders(['ready', 'pickedup', 'atshop'])
    if (!this.orders.length) this.router.navigate(['new-order'])
  }

}
