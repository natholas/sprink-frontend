import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderTermsComponent } from './service-provider-terms.component';

describe('ServiceProviderTermsComponent', () => {
  let component: ServiceProviderTermsComponent;
  let fixture: ComponentFixture<ServiceProviderTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
