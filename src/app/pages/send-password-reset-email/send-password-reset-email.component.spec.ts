import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPasswordResetEmailComponent } from './send-password-reset-email.component';

describe('SendPasswordResetEmailComponent', () => {
  let component: SendPasswordResetEmailComponent;
  let fixture: ComponentFixture<SendPasswordResetEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPasswordResetEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPasswordResetEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
