import { Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';
import { debounce } from '../../libs/debounce';

@Component({
  selector: 'app-bubble-screen',
  templateUrl: './bubble-screen.component.html',
  styleUrls: ['./bubble-screen.component.scss']
})
export class BubbleScreenComponent implements OnInit {

  user
  multiplier = 1

  constructor(private state: StateService, private userService: UserService) {
    this.user = this.state.user
    if (!this.user.bubbleCount) this.user.bubbleCount = 0
    if (this.user.primaryPaymentMethod) this.multiplier = 2
  }

  ngOnInit(): void {
  }

  onUpdate(e) {
    this.user.bubbleCount = e
    this.updatePoppedCount()
  }

  updatePoppedCount = debounce(() => {
    this.userService.updateUser({ bubbleCount: this.user.bubbleCount})
  }, 2500)

}
