import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinkyOnBikeComponent } from './sprinky-on-bike.component';

describe('SprinkyOnBikeComponent', () => {
  let component: SprinkyOnBikeComponent;
  let fixture: ComponentFixture<SprinkyOnBikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprinkyOnBikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprinkyOnBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
