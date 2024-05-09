import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNotificationBoxComponent } from './request-notification-box.component';

describe('RequestNotificationBoxComponent', () => {
  let component: RequestNotificationBoxComponent;
  let fixture: ComponentFixture<RequestNotificationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestNotificationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNotificationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
