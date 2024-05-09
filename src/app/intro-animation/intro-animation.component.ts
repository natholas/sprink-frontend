import { Component } from '@angular/core';

@Component({
  selector: 'app-intro-animation',
  templateUrl: './intro-animation.component.html',
  styleUrls: ['./intro-animation.component.scss']
})
export class IntroAnimationComponent {

  hideLoader = false

  constructor() {
    setTimeout(() => {
      this.hideLoader = true
    }, 1000)
  }

}
