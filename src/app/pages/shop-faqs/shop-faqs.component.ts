import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-shop-faqs',
  templateUrl: './shop-faqs.component.html',
  styleUrls: ['./shop-faqs.component.scss']
})
export class ShopFaqsComponent {

  constructor(public chat: ChatService, private location: Location) { }

  goBack() {
    this.location.back()
  }

}
