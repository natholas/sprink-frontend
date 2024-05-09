import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  showShopBanner: boolean

  constructor(
    private analytics: AnalyticsService,
    private route: ActivatedRoute,
    public state: StateService
  ) {
    this.showShopBanner = !(this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'get-started')
  }

  ngAfterViewInit() {
    let video = <HTMLVideoElement>document.getElementById('video')
    video.muted = true
    video.play()
  }

  scrollToElement($element: Element): void {
    let button = $element.id === 'signup' ? 'Get Started' : 'Scroll to content'
    this.analytics.event('button-clicked', button)

    // $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest'});

    var offset = 64;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = $element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

  }

}
