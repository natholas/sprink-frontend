import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsMapComponent } from './shops-map.component';

describe('ShopsMapComponent', () => {
  let component: ShopsMapComponent;
  let fixture: ComponentFixture<ShopsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
