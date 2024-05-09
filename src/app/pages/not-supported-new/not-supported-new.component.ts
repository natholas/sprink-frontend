import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-not-supported-new',
  templateUrl: './not-supported-new.component.html',
  styleUrls: ['./not-supported-new.component.scss']
})
export class NotSupportedNewComponent {

  constructor(private userService: UserService, private state: StateService) {
    this.userService.checkLoggedIn().then((resp) => {
      if (!resp || this.state.user.noShopsInRange) return
      this.userService.updateUser({ noShopsInRange: true })
      this.userService.requestNotificationsPermissions()
    })
  }

}
