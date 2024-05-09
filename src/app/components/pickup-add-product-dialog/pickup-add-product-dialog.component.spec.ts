import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupAddProductDialogComponent } from './pickup-add-product-dialog.component';

describe('PickupAddProductDialogComponent', () => {
  let component: PickupAddProductDialogComponent;
  let fixture: ComponentFixture<PickupAddProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupAddProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupAddProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
