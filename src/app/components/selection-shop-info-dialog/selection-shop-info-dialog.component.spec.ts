import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionShopInfoDialogComponent } from './selection-shop-info-dialog.component';

describe('SelectionShopInfoDialogComponent', () => {
  let component: SelectionShopInfoDialogComponent;
  let fixture: ComponentFixture<SelectionShopInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionShopInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionShopInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
