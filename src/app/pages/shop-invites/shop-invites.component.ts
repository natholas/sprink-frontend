import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-shop-invites',
  templateUrl: './shop-invites.component.html',
  styleUrls: ['./shop-invites.component.scss']
})
export class ShopInvitesComponent {

  invites: any[]
  loading = false

  constructor() { }

}
