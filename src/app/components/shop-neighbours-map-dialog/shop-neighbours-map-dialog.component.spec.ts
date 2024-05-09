import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNeighboursMapDialogComponent } from './shop-neighbours-map-dialog.component';

describe('ShopNeighboursMapDialogComponent', () => {
  let component: ShopNeighboursMapDialogComponent;
  let fixture: ComponentFixture<ShopNeighboursMapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopNeighboursMapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopNeighboursMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
