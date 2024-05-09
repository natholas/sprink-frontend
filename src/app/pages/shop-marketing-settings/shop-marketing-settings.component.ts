import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-shop-marketing-settings',
  templateUrl: './shop-marketing-settings.component.html',
  styleUrls: ['./shop-marketing-settings.component.scss']
})
export class ShopMarketingSettingsComponent {

  shop: any

  constructor(
    private route: ActivatedRoute,
    public chat: ChatService
  ) {
    this.shop = this.route.snapshot.data.shop
  }

}
