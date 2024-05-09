import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-shop-settings',
  templateUrl: './shop-settings.component.html',
  styleUrls: ['./shop-settings.component.scss']
})
export class ShopSettingsComponent {

  shop: any
  constructor(private route: ActivatedRoute, public chat: ChatService) {
    this.shop = this.route.snapshot.data.shop[0]
  }

}
