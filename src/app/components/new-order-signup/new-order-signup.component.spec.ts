import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderSignupComponent } from './new-order-signup.component';

describe('NewOrderSignupComponent', () => {
  let component: NewOrderSignupComponent;
  let fixture: ComponentFixture<NewOrderSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrderSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
