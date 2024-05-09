import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInvitesComponent } from './shop-invites.component';

describe('ShopInvitesComponent', () => {
  let component: ShopInvitesComponent;
  let fixture: ComponentFixture<ShopInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
