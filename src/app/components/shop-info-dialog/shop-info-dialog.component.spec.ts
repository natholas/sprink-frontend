import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInfoDialogComponent } from './shop-info-dialog.component';

describe('ShopInfoDialogComponent', () => {
  let component: ShopInfoDialogComponent;
  let fixture: ComponentFixture<ShopInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
