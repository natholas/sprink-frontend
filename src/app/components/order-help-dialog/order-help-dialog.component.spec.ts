import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHelpDialogComponent } from './order-help-dialog.component';

describe('OrderHelpDialogComponent', () => {
  let component: OrderHelpDialogComponent;
  let fixture: ComponentFixture<OrderHelpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHelpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
