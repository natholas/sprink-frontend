import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopVerificationDocumentsComponent } from './shop-verification-documents.component';

describe('ShopVerificationDocumentsComponent', () => {
  let component: ShopVerificationDocumentsComponent;
  let fixture: ComponentFixture<ShopVerificationDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopVerificationDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopVerificationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
