import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSelectionComponent } from './icon-selection.component';

describe('IconSelectionComponent', () => {
  let component: IconSelectionComponent;
  let fixture: ComponentFixture<IconSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
