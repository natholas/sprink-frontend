import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallBannerComponent } from './install-banner.component';

describe('InstallBannerComponent', () => {
  let component: InstallBannerComponent;
  let fixture: ComponentFixture<InstallBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
