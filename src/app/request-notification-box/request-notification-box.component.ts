import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-request-notification-box',
  templateUrl: './request-notification-box.component.html',
  styleUrls: ['./request-notification-box.component.scss']
})
export class RequestNotificationBoxComponent {

  constructor(public userService: UserService) { }

}
